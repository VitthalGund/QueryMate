import express from "express";
const router = express.Router();
import { handleLogin } from "../controllers/authController.js";
import { handleGoogleAuth } from "../controllers/googleAuth.js";

router.post("/", handleLogin);
router.post("/google", handleGoogleAuth);

export default router;
