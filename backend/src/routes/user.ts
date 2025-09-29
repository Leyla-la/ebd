import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.ts";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} from "../controllers/userController.ts";

const router = express.Router();

// GET /users (admin only)

router.get("/", authMiddleware(["admin"]), getAllUsers);
// GET /users/:id (admin or self)
router.get("/:id", authMiddleware(["admin", "employee"]), getUserById);
// PATCH /users/:id (admin or self)
router.patch("/:id", authMiddleware(["admin", "employee"]), updateUser);
// DELETE /users/:id (admin only)
router.delete("/:id", authMiddleware(["admin"]), deleteUser);

export default router;
