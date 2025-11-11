import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import { upload, handleUploadErrors } from "../middleware/upload.js";
import {
  createClub,
  getClubs,
  getClub,
  updateClub,
  deleteClub,
  joinClub,
  leaveClub,
  getClubMembers,
  updateMemberRole,
  removeMember,
} from "../controllers/clubController.js";

const router = express.Router();

router.use(authenticateToken);

router.get("/", getClubs);
router.post("/", upload.single("image"), handleUploadErrors, createClub); // ✅ Ici
router.get("/:id", getClub);
router.put("/:id", upload.single("image"), handleUploadErrors, updateClub); // ✅ Et ici
router.delete("/:id", deleteClub);

// Membres
router.get("/:id/members", getClubMembers);
router.post("/:id/join", joinClub);
router.post("/:id/leave", leaveClub);
router.put("/:id/members/:userId/role", updateMemberRole);
router.delete("/:id/members/:userId", removeMember);
export default router;
