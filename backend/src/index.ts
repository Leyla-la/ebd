// (Global request logger moved below)
import express from "express";
console.log('=== Express app started ===');
import { createServer } from "http";
import { Server as IOServer } from "socket.io";
import { registerNotificationSocket } from "./sockets/notification";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from './routes/auth';
import employeeRoutes from './routes/employee';
import userRoutes from './routes/user';
import payrollRoutes from './routes/payroll';
import taskRoutes from './routes/task';
import ebdLogRoutes from './routes/ebdLog'; // Importing ebdLog routes
import notificationRoutes from './routes/notification'; // Importing notification routes
import contractRoutes from './routes/contract'; // Importing contract routes
import emergencyContactRoutes from './routes/emergencyContact'; // Importing emergencyContact routes

// CONFIGURATION
dotenv.config();
const app = express();
// GLOBAL REQUEST LOGGER FOR DEBUGGING
app.use((req, res, next) => {
  console.log('[GLOBAL LOG]', req.method, req.originalUrl);
  next();
});
const httpServer = createServer(app);
const io = new IOServer(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true
  }
});
registerNotificationSocket(io);
app.locals.io = io;
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// ROUTE
app.get("/", (req, res) => {
  res.send("This is home route");
});


app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/users", userRoutes);
app.use("/api/payrolls", payrollRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/ebd-logs", ebdLogRoutes); // Registering ebdLog route
app.use("/api/notifications", notificationRoutes); // Registering notification route
app.use("/api/contracts", contractRoutes); // Registering contract route
app.use("/api/emergency-contacts", emergencyContactRoutes); // Registering emergencyContact route


// SERVER
const port = Number(process.env.PORT) || 3002;
httpServer.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});
