import express from "express";
import { registerUser, loginUser, getProfile } from "../controllers/userController.js";
import { authenticate, validateInput } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", validateInput, registerUser);
router.post("/login", validateInput, loginUser);
router.get("/profile", authenticate, getProfile);

export default router;
