import express from "express";
import { createMessage, getMessages} from "../controllers/messageController.js";


const router = express.Router();

// router.post("/", createMessage);
router.post("/:username", createMessage);
router.get("/:username", getMessages);


export default router;
