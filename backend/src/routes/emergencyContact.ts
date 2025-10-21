import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import {
  getAllEmergencyContacts,
  getEmergencyContactById,
  createEmergencyContact,
  updateEmergencyContact,
  deleteEmergencyContact
} from "../controllers/emergencyContactController";

const router = Router();

// GET /emergency-contacts (admin: all, employee: only own)
router.get("/", authMiddleware(["SuperAdmins", "admin", "employee"]), getAllEmergencyContacts);
// GET /emergency-contacts/:id (admin: any, employee: only own)
router.get("/:id", authMiddleware(["SuperAdmins", "admin", "employee"]), getEmergencyContactById);
// POST /emergency-contacts (admin only)
router.post("/", authMiddleware(["SuperAdmins", "admin"]), createEmergencyContact);
// PUT /emergency-contacts/:id (admin only)
router.put("/:id", authMiddleware(["SuperAdmins", "admin"]), updateEmergencyContact);
// DELETE /emergency-contacts/:id (admin only)
router.delete("/:id", authMiddleware(["SuperAdmins", "admin"]), deleteEmergencyContact);

export default router;
