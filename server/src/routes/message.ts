import express from "express";
import { ChatMessage } from "../models/message.js";
const router = express.Router();

router.post("/", async (req: express.Request, res: express.Response) => {
  const { chatId } = req.body;
  if (!chatId) {
    return res.status(400).json({
      error: "Missing ChatId in the request body.",
    });
  }

  const response = await ChatMessage.find({ chatId });
  res.json({ messages: response });
});

export default router;
