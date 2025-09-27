import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
} from "../controllers/taskController.js";

const router = Router();

// GET /tasks (admin: all, employee: only assigned)
router.get("/", authMiddleware(["admin", "employee"]), getAllTasks);
// GET /tasks/:id (admin: any, employee: only assigned)
router.get("/:id", authMiddleware(["admin", "employee"]), getTaskById);
// POST /tasks (admin only)
router.post("/", authMiddleware(["admin"]), createTask);
// PUT /tasks/:id (admin only)
router.put("/:id", authMiddleware(["admin"]), updateTask);
// DELETE /tasks/:id (admin only)
router.delete("/:id", authMiddleware(["admin"]), deleteTask);

export default router;
