import express from "express";
import { getAllEmployees, getEmployeeById } from "../controllers/employeeController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();


// GET /employees (admin only)
router.get("/", authMiddleware(["admin"]), getAllEmployees);

// GET /employees/:id (admin or self)
router.get("/:id", authMiddleware(["admin", "employee"]), getEmployeeById);

export default router;
