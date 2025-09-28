import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.ts";
import {
  getAllEmergencyContacts,
  getEmergencyContactById,
  createEmergencyContact,
  updateEmergencyContact,
  deleteEmergencyContact
} from "../controllers/emergencyContactController.ts";

const router = Router();

// GET /emergency-contacts (admin: all, employee: only own)
router.get("/", authMiddleware(["admin", "employee"]), getAllEmergencyContacts);
// GET /emergency-contacts/:id (admin: any, employee: only own)
router.get("/:id", authMiddleware(["admin", "employee"]), getEmergencyContactById);
// POST /emergency-contacts (admin only)
router.post("/", authMiddleware(["admin"]), createEmergencyContact);
// PUT /emergency-contacts/:id (admin only)
router.put("/:id", authMiddleware(["admin"]), updateEmergencyContact);
// DELETE /emergency-contacts/:id (admin only)
router.delete("/:id", authMiddleware(["admin"]), deleteEmergencyContact);

export default router;
