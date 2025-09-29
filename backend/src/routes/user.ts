console.log('User router loaded');
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
router.get("/", authMiddleware(["SuperAdmins"]), getAllUsers);
// GET /users/cognito/:id (admin or self, same as /users/:id)
router.get("/cognito/:id", authMiddleware(["SuperAdmins", "Employees"]), getUserById);
// GET /users/:id (admin or self)
router.get("/:id", authMiddleware(["SuperAdmins", "Employees"]), getUserById);
// PATCH /users/:id (admin or self)
router.patch("/:id", authMiddleware(["SuperAdmins", "Employees"]), updateUser);
// DELETE /users/:id (admin only)
router.delete("/:id", authMiddleware(["SuperAdmins"]), deleteUser);

export default router;
