import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import {
  getAllNotifications,
  getNotificationById,
  createNotification,
  updateNotification,
  deleteNotification
} from "../controllers/notificationController";

const router = Router();

// GET /notifications (admin: all, employee: only own)
router.get("/", authMiddleware(["SuperAdmins", "admin", "employee"]), getAllNotifications);
// GET /notifications/:id (admin: any, employee: only own)
router.get("/:id", authMiddleware(["SuperAdmins", "admin", "employee"]), getNotificationById);
// POST /notifications (admin only)
router.post("/", authMiddleware(["SuperAdmins", "admin"]), createNotification);
// PUT /notifications/:id (admin only)
router.put("/:id", authMiddleware(["SuperAdmins", "admin"]), updateNotification);
// DELETE /notifications/:id (admin only)
router.delete("/:id", authMiddleware(["SuperAdmins", "admin"]), deleteNotification);

export default router;
