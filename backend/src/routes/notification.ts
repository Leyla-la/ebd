import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.ts";
import {
  getAllNotifications,
  getNotificationById,
  createNotification,
  updateNotification,
  deleteNotification
} from "../controllers/notificationController.ts";

const router = Router();

// GET /notifications (admin: all, employee: only own)
router.get("/", authMiddleware(["admin", "employee"]), getAllNotifications);
// GET /notifications/:id (admin: any, employee: only own)
router.get("/:id", authMiddleware(["admin", "employee"]), getNotificationById);
// POST /notifications (admin only)
router.post("/", authMiddleware(["admin"]), createNotification);
// PUT /notifications/:id (admin only)
router.put("/:id", authMiddleware(["admin"]), updateNotification);
// DELETE /notifications/:id (admin only)
router.delete("/:id", authMiddleware(["admin"]), deleteNotification);

export default router;
