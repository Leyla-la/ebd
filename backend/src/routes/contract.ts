import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  getAllContracts,
  getContractById,
  createContract,
  updateContract,
  deleteContract
} from "../controllers/contractController.js";

const router = Router();

// GET /contracts (admin: all, employee: only own)
router.get("/", authMiddleware(["admin", "employee"]), getAllContracts);
// GET /contracts/:id (admin: any, employee: only own)
router.get("/:id", authMiddleware(["admin", "employee"]), getContractById);
// POST /contracts (admin only)
router.post("/", authMiddleware(["admin"]), createContract);
// PUT /contracts/:id (admin only)
router.put("/:id", authMiddleware(["admin"]), updateContract);
// DELETE /contracts/:id (admin only)
router.delete("/:id", authMiddleware(["admin"]), deleteContract);

export default router;
