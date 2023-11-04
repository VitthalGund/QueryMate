import express from "express";
import { ChatMessage } from "../models/message.js";
import { UserChat } from "../models/Chat.js";
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

router.post("/chats", async (req: express.Request, res: express.Response) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({
      error: "Missing email!",
    });
  }

  const response = await UserChat.distinct("chatId");

  const chats = [];
  for (let index = 0; index < response.length; index++) {
    const element = response[index];
    if (element.email) {
      chats.push(
        await UserChat.findOne(
          { chatId: element },
          { chatId: 1, fileName: 1, title: 1 }
        )
      );
    }
  }
  res.json({ chats });
});

export default router;
