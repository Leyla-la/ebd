import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  getAllPayrolls,
  getPayrollById,
  createPayroll,
  updatePayroll,
  deletePayroll
} from "../controllers/payrollController.js";

const router = Router();

// GET /payrolls (admin: all, employee: only own)
router.get("/", authMiddleware(["admin", "employee"]), getAllPayrolls);
// GET /payrolls/:id (admin: any, employee: only own)
router.get("/:id", authMiddleware(["admin", "employee"]), getPayrollById);
// POST /payrolls (admin only)
router.post("/", authMiddleware(["admin"]), createPayroll);
// PUT /payrolls/:id (admin only)
router.put("/:id", authMiddleware(["admin"]), updatePayroll);
// DELETE /payrolls/:id (admin only)
router.delete("/:id", authMiddleware(["admin"]), deletePayroll);

export default router;
