import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import {
  getUserNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification
} from "../controllers/notificationController.js";

const router = express.Router();

router.use(authenticateToken);

router.get("/", getUserNotifications);
router.put("/:notificationId/read", markAsRead);
router.put("/read-all", markAllAsRead);
router.delete("/:notificationId", deleteNotification);

export default router;