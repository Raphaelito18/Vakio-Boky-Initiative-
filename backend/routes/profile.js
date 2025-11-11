import express from "express";
import {
  getProfile,
  updateProfile,
  changePassword,
  uploadProfilePicture,
  deleteProfilePicture,
  upload,
} from "../controllers/profileController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

router.use(authenticateToken);

router.get("/", getProfile);
router.put("/", updateProfile);
router.put("/password", changePassword);

//Pour photos
router.put("/picture", upload.single("profilePicture"), uploadProfilePicture);
router.delete("/picture", deleteProfilePicture);

export default router;
