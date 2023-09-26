import express from "express";
const router = express.Router();
import {
  sendVerificationEmail,
  verifyPassword,
} from "../controllers/forgotPasswordControllers.js";

router.post("/forgotpassword", sendVerificationEmail);
router.post("/verifypassword", verifyPassword);

export default router;
