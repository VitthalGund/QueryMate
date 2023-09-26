import express from "express";
const router = express.Router();
import { handleLogout } from "../controllers/logoutController.js";

export default router.get("/", handleLogout);
