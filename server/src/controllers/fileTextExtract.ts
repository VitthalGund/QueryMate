/*
export const extractText = async (req: Request, res: Response) => {
  textract.fromFileWithPath(
    req.file.path,
    function (error: Error, text: string) {
      if (error) {
        console.error("fileTextExtract:14: " + error);
        res.status(500).json({ error: "Failed to extract text from file" });
      } else {
        console.log("fileTextExtract:14: " + text);
        jwt.verify(
          req.cookies.jwt,
          process.env.ACCESS_TOKEN_SECRET!,
          async function (err: Error, decoded: JwtPayload) {
            if (err) {
              res
                .status(400)
                .json({ message: "Login Expires!", success: false });
            }
            const chat = await UserChat.create({
              fileName: req.file.originalname,
              email: decoded.email,
              title: text.slice(0, 15).trim(),
              passage:text
            });
            res.json({
              status: "File uploaded and processed successfully",
              success: true,
              id: chat.chatId,
            });
          }
        );
      }
    }
  );
};
*/
import textract from "textract";
// import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response } from "express";
import mongoose from "mongoose";
import Tesseract from "tesseract.js";
import { saveToMongoDB } from "../utils/database.js";
import {
  extractAudioFromVideo,
  extractTextFromAudio,
  extractTextFromVideo,
} from "../utils/extractText.js";

export const extractText = async (req: Request, res: Response) => {
  const currentChatId = new mongoose.Types.ObjectId(); // Generate a new chatId for each file

  // console.log(req.file);
  if (!req.file) {
    return res
      .status(400)
      .json({ sucess: false, message: "missing file input!" });
  }
  try {
    if (req.file.mimetype.startsWith("image/")) {
      // Handle image file
      const result = await Tesseract.recognize(req.file.path);
      const data = await saveToMongoDB(
        result.data.text,
        req,
        currentChatId,
        req.body?.email
      );
      res.status(200).json({
        success: true,
        message: "File uploaded and processed successfully",
        chatId: data.chatId,
        email: data.email,
        multi: data.multi,
      });
    } else if (req.file.mimetype.startsWith("audio/")) {
      const textOutput = await extractTextFromAudio(req.file.buffer);
      if (textOutput.success) {
        const data = await saveToMongoDB(
          textOutput.text,
          req,
          currentChatId,
          req.body?.email
        );
        res.json({
          success: true,
          message: "File uploaded and processed successfully",
          chatId: data.chatId,
          email: data.email,
          multi: data.multi,
        });
      } else {
        res.status(400).json({
          success: false,
          message: "unable to perfrom operation",
        });
      }
    } else if (req.file.mimetype.startsWith("video/")) {
      const audio = extractAudioFromVideo(req.file.path);
      const videoText = extractTextFromVideo(req.file.path);
      const output = await Promise.all([audio, videoText]);
      const audioText = await extractTextFromAudio(output[0]);
      const resp = await saveToMongoDB(
        audioText + "\n" + videoText,
        req,
        currentChatId,
        req.body?.email
      );
      // Error handling needed to implement.
      console.log("Text saved to MongoDB");
      res.json({
        success: true,
        message: "File uploaded and processed successfully",
        chatId: resp.chatId,
        email: resp.email,
        multi: resp.multi,
      });
    } else {
      // Handle other file types (e.g., PDF, DOC, TXT)
      // textract.fromFileWithPath(req.file.path, async function (error, text) {
      textract.fromFileWithMimeAndPath(
        req.file.mimetype,
        req.file.path,
        {
          preserveLineBreaks: true,
          includeAltText: true,
        },
        async function (error, text) {
          if (error) {
            console.error(error);
            res.status(500).json({ error: "Failed to extract text from file" });
          } else {
            const data = await saveToMongoDB(text, req, currentChatId);
            console.log("Text saved to MongoDB");
            res.json({
              success: true,
              message: "File uploaded and processed successfully",
              chatId: data.chatId,
              email: data.email,
              multi: data.multi,
            });
          }
        }
      );
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
