import express from "express";
import { createServer } from "http";
import { Server as IOServer } from "socket.io";
import { registerNotificationSocket } from "./sockets/notification.js";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from './routes/auth.js';
import employeeRoutes from './routes/employee.js';
import payrollRoutes from './routes/payroll.js';
import taskRoutes from './routes/task.js';
import ebdLogRoutes from './routes/ebdLog.js'; // Importing ebdLog routes
import notificationRoutes from './routes/notification.js'; // Importing notification routes
import contractRoutes from './routes/contract.js'; // Importing contract routes
import emergencyContactRoutes from './routes/emergencyContact.js'; // Importing emergencyContact routes

// CONFIGURATION
dotenv.config();
const app = express();
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


app.use("/employees", employeeRoutes);
app.use("/payrolls", payrollRoutes);
app.use("/tasks", taskRoutes);
app.use("/ebd-logs", ebdLogRoutes); // Registering ebdLog route
app.use("/notifications", notificationRoutes); // Registering notification route
app.use("/contracts", contractRoutes); // Registering contract route
app.use("/emergency-contacts", emergencyContactRoutes); // Registering emergencyContact route

// app.use("/applications", applicationRoutes);
// app.use("/properties", propertyRoutes);
// app.use("/leases", leaseRoutes);
// app.use("/tenants", authMiddleware(["tenant"]), tenantRoutes);
// app.use("/managers", authMiddleware(["manager"]), managerRoutes);



// SERVER
const port = Number(process.env.PORT) || 3002;
httpServer.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});
