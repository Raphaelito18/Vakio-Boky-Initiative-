import express from "express";
import CommentController from "../controllers/CommentController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

router.delete("/:id", authenticateToken, CommentController.deleteComment);

router.put("/:id", authenticateToken, CommentController.updateComment);

router.get("/:id", CommentController.getComment);

export default router;
