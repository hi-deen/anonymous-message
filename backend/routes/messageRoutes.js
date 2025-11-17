import express from "express";
import { createMessage, getMessages, deleteMessage } from "../controllers/messageController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:username", createMessage); // Anyone can send anonymous messages
router.get("/:username", getMessages); // Public - anyone can view messages
router.delete("/:id", authenticate, deleteMessage); // Only authenticated users can delete their messages

export default router;
