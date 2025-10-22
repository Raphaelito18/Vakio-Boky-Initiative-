import express from "express";
import { 
  getProfile, 
  updateProfile, 
  changePassword, 
  updateProfilePicture 
} from "../controllers/profileController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

router.use(authenticateToken); // Toutes les routes protégées

router.get("/", getProfile);
router.put("/", updateProfile);
router.put("/password", changePassword);
router.put("/picture", updateProfilePicture);

export default router;