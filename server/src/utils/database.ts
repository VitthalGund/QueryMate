import mongoose from "mongoose";
import { useModel, loadUseModel } from "../routes/textQna.js";
import { chunkPassage } from "./passage.js";
import natural from "natural";
import { UserChat } from "../models/Chat.js";
import express from "express";

import jwt, { JwtPayload } from "jsonwebtoken";

// Function to save text data to MongoDB
export async function saveToMongoDB(
  text: string,
  req: express.Request,
  chatId: mongoose.Types.ObjectId
) {
  let chunks: string[] = [];

  if (!useModel) {
    await loadUseModel();
  }

  // console.log(text);
  // if (Buffer.from(text).length > 16 * 1024 * 1024) {
  if (text.length >= 4000) {
    // Split the text into chunks if it exceeds 16MB
    chunks = await chunkPassage(
      text,
      1000,
      0.3,
      useModel,
      new natural.SentenceTokenizer()
    );
  } else {
    chunks.push(text);
  }

  const res: JwtPayload = jwt.verify(
    req.headers.authorization,
    process.env.REFRESH_TOKEN_SECRET!
  ) as JwtPayload;
  // console.log(chunks);
  const chatResp = [];
  let multi = false;
  if (chunks.length > 0) {
    multi = true;
  }
  console.log(chunks);
  for (const chunk of chunks) {
    if (chunk) {
      const chat = new UserChat({
        chatId: chatId,
        title: text.slice(0, 10),
        email: res.decoded["email"],
        fileName: req.file.originalname || " ",
        passage: chunk,
        multi,
      });
      chatResp.push(await chat.save());
    }
  }
  return {
    email: chatResp[0].email,
    chatId: chatResp[0].chatId,
    multi,
  };
}
