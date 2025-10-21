import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import {
  getAllEbdLogs,
  getEbdLogById,
  createEbdLog,
  updateEbdLog,
  deleteEbdLog
} from "../controllers/ebdLogController";

const router = Router();

// GET /ebd-logs (admin: all, employee: only own)
router.get("/", authMiddleware(["SuperAdmins", "admin", "employee"]), getAllEbdLogs);
// GET /ebd-logs/:id (admin: any, employee: only own)
router.get("/:id", authMiddleware(["SuperAdmins", "admin", "employee"]), getEbdLogById);
// POST /ebd-logs (admin only)
router.post("/", authMiddleware(["SuperAdmins", "admin"]), createEbdLog);
// PUT /ebd-logs/:id (admin only)
router.put("/:id", authMiddleware(["SuperAdmins", "admin"]), updateEbdLog);
// DELETE /ebd-logs/:id (admin only)
router.delete("/:id", authMiddleware(["SuperAdmins", "admin"]), deleteEbdLog);

export default router;
