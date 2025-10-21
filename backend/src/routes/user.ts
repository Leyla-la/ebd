console.log('User router loaded');
import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserByCognitoId,
} from "../controllers/userController";

const router = express.Router();

// IMPORTANT: Specific routes must come before parameterized routes
// This route should be the primary way to get user data after login
router.get("/cognito", authMiddleware(["SuperAdmins", "admin", "employee"]), getUserByCognitoId);
// GET /users (admin only)
router.get("/", authMiddleware(["SuperAdmins", "admin"]), getAllUsers);
// GET /users/:id (admin or self) - Keep for fetching other users by ID
router.get("/:id", authMiddleware(["SuperAdmins", "admin", "employee"]), getUserById);
// PATCH /users/:id (admin or self)
router.patch("/:id", authMiddleware(["SuperAdmins", "admin", "employee"]), updateUser);
// DELETE /users/:id (admin only)
router.delete("/:id", authMiddleware(["SuperAdmins", "admin"]), deleteUser);

export default router;
