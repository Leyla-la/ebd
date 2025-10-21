import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
} from "../controllers/taskController";

const router = Router();

// GET /tasks (admin: all, employee: only assigned)
router.get("/", authMiddleware(["SuperAdmins", "admin", "employee"]), getAllTasks);
// GET /tasks/:id (admin: any, employee: only assigned)
router.get("/:id", authMiddleware(["SuperAdmins", "admin", "employee"]), getTaskById);
// POST /tasks (admin only)
router.post("/", authMiddleware(["SuperAdmins", "admin"]), createTask);
// PUT /tasks/:id (admin only)
router.put("/:id", authMiddleware(["SuperAdmins", "admin"]), updateTask);
// DELETE /tasks/:id (admin only)
router.delete("/:id", authMiddleware(["SuperAdmins", "admin"]), deleteTask);

export default router;
