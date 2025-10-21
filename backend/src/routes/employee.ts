import express from "express";
import { getAllEmployees, getEmployeeById } from "../controllers/employeeController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();


// GET /employees (admin only)
router.get("/", authMiddleware(["SuperAdmins", "admin"]), getAllEmployees);

// GET /employees/:id (admin or self)
router.get("/:id", authMiddleware(["admin", "employee"]), getEmployeeById);

export default router;
