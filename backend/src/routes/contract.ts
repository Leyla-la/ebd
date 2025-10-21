import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import {
  getAllContracts,
  getContractById,
  createContract,
  updateContract,
  deleteContract
} from "../controllers/contractController";

const router = Router();

// GET /contracts (admin: all, employee: only own)
router.get("/", authMiddleware(["SuperAdmins", "admin", "employee"]), getAllContracts);
// GET /contracts/:id (admin: any, employee: only own)
router.get("/:id", authMiddleware(["SuperAdmins", "admin", "employee"]), getContractById);
// POST /contracts (admin only)
router.post("/", authMiddleware(["SuperAdmins", "admin"]), createContract);
// PUT /contracts/:id (admin only)
router.put("/:id", authMiddleware(["SuperAdmins", "admin"]), updateContract);
// DELETE /contracts/:id (admin only)
router.delete("/:id", authMiddleware(["SuperAdmins", "admin"]), deleteContract);

export default router;
