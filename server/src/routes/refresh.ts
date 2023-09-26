import express from "express";
const router = express.Router();
import { handleRefreshToken } from "../controllers/refreshTokenController.js";

export default router.get("/", handleRefreshToken);
