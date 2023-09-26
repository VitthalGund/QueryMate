import express from "express";
const router = express.Router();
import { handleLogin } from "../controllers/authController.js";

export default router.post("/", handleLogin);
