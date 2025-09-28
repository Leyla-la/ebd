import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.ts";
import {
  getAllEbdLogs,
  getEbdLogById,
  createEbdLog,
  updateEbdLog,
  deleteEbdLog
} from "../controllers/ebdLogController.ts";

const router = Router();

// GET /ebd-logs (admin: all, employee: only own)
router.get("/", authMiddleware(["admin", "employee"]), getAllEbdLogs);
// GET /ebd-logs/:id (admin: any, employee: only own)
router.get("/:id", authMiddleware(["admin", "employee"]), getEbdLogById);
// POST /ebd-logs (admin only)
router.post("/", authMiddleware(["admin"]), createEbdLog);
// PUT /ebd-logs/:id (admin only)
router.put("/:id", authMiddleware(["admin"]), updateEbdLog);
// DELETE /ebd-logs/:id (admin only)
router.delete("/:id", authMiddleware(["admin"]), deleteEbdLog);

export default router;
