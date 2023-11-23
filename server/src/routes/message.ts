import express from "express";
import { ChatMessage } from "../models/message.js";
import { UserChat } from "../models/Chat.js";
import jwt from "jsonwebtoken";
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

router.post("/edit", async (req: express.Request, res: express.Response) => {
  const { newTitle, chatId } = req.body;
  if (!newTitle) {
    return res
      .status(400)
      .json({ success: false, message: "Missing new title" });
  }
  if (!chatId) {
    return res
      .status(400)
      .json({ success: false, message: "Missing new title" });
  }
  const Response = jwt.verify(
    req.headers.authorization,
    process.env.ACCESS_TOKEN_SECRET
  );
  const resp = await UserChat.findOne({
    chatId,
    email: Response["UserInfo"].email,
  });
  if (!resp) {
    return res
      .status(400)
      .json({ message: "invalid credentails", success: false });
  }

  resp.title = newTitle;
  const done = await resp.save();
  res.status(202).json({
    message: "title updated successfully!",
    success: true,
    response: done,
  });
});

router.post("/chats", async (req: express.Request, res: express.Response) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({
      error: "Missing email!",
    });
  }

  const response = await UserChat.find({ email }).distinct("chatId");

  const chats = [];
  for (let index = 0; index < response.length; index++) {
    const element = await UserChat.findOne(
      { chatId: response[index] },
      { passage: 0, multi: 0 }
    );
    chats.push(element);
  }

  res.json({ chats });
});

export default router;
