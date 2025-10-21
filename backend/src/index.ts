/// <reference path="./types/express.d.ts" />

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
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

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


app.use("/auth", authRoutes);
app.use("/employees", employeeRoutes);
app.use("/users", userRoutes);
app.use("/payrolls", payrollRoutes);
app.use("/tasks", taskRoutes);
app.use("/ebd-logs", ebdLogRoutes); // Registering ebdLog route
app.use("/notifications", notificationRoutes); // Registering notification route
app.use("/contracts", contractRoutes); // Registering contract route
app.use("/emergency-contacts", emergencyContactRoutes); // Registering emergencyContact route


// SERVER
const port = Number(process.env.PORT) || 3002;
httpServer.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});

// --- Automation: simple cron to auto-calc and auto-pay (mock) ---
// Dynamically require to avoid type/module issues during dev; if missing, skip scheduling
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const cron = require('node-cron');
  // Every day at 02:00, if day >= 25, ensure payroll for current month exists and pay pending
  cron.schedule('0 2 * * *', async () => {
    const now = new Date();
    if (now.getDate() < 25) return;
    const month = `${now.getMonth() + 1}`;
    const year = now.getFullYear();
    console.log('[CRON] Payroll automation running for', month, year);
    // Ensure payroll exists
    let payroll = await prisma.payroll.findFirst({ where: { month, year } });
    if (!payroll) {
      payroll = await prisma.payroll.create({
        data: {
          month,
          year,
          payPeriodStart: new Date(year, Number(month) - 1, 1),
          payPeriodEnd: new Date(year, Number(month), 0),
          payDate: now,
          status: 'PROCESSING',
        },
      });
      const employees = await prisma.employee.findMany();
      for (const emp of employees) {
        await prisma.payrollItem.create({
          data: {
            payrollId: payroll.id,
            employeeId: emp.id,
            baseSalary: 0,
            bonuses: 0,
            deductions: 0,
            netPay: 0,
            status: 'PENDING',
            details: {},
          },
        });
      }
      await prisma.payroll.update({ where: { id: payroll.id }, data: { status: 'COMPLETED' } });
    }
    // Auto-pay pending items
    const pendingItems = await prisma.payrollItem.findMany({ where: { payrollId: payroll.id, status: 'PENDING' } });
    for (const item of pendingItems) {
      await prisma.payrollItem.update({
        where: { id: item.id },
        data: {
          status: 'PAID',
          details: { payment: { provider: 'AppotaPay', status: 'SUCCESS', transactionId: `CRON_${item.id.slice(0,6)}` } } as any,
        },
      });
    }
    console.log('[CRON] Payroll automation finished.');
  });
} catch (e) {
  console.warn('[CRON] node-cron not available, skipping scheduler');
}
