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
import { UserChat } from "../models/Chat.js";
// import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response } from "express";
import Tesseract from "tesseract.js";
import { chunkPassage } from "../utils/passage.js"; // Import the chunking function
import mongoose from "mongoose";
import { useModel } from "../routes/textQna.js";
import natural from "natural";
// import jwt, { JwtPayload } from "jsonwebtoken";
// import shortid from 'mongoose-shortid-nodeps'; // Import mongoose-shortid-nodeps
// Import Vosk speech-to-text
// import vosk from "vosk";
// require("../../MLModels/vosk-model-small-en-us-0.15")
import { loadUseModel } from "../routes/textQna.js";

export const extractText = async (req: Request, res: Response) => {
  const currentChatId = new mongoose.Types.ObjectId(); // Generate a new chatId for each file
  console.log(req.file.path);
  try {
    if (
      req.file.mimetype.startsWith("image/") ||
      req.file.mimetype.startsWith("video/")
    ) {
      // Handle image file
      const result = await Tesseract.recognize(req.file.path);
      const data = await saveToMongoDB(result.data.text, req, currentChatId);
      if (data.success) {
        res.status(200).json({
          success: true,
          message: "File uploaded and processed successfully",
          chartId: data.chatId,
          email: data.email,
          multi: data.multi,
        });
      } else {
        res
          .status(400)
          .json({ success: false, message: "unable to perfrom operation" });
      }
    } else if (req.file.mimetype.startsWith("audio/")) {
      // Handle audio or video file with Vosk speech-to-11
      /*
      const model = new vosk.Model(
        "../../MLModels/vosk-model-small-en-us-0.15/am/final.mdl"
      );
      const recognizer = new vosk.Recognizer({ model: model });

      recognizer.write(req.file.buffer);
      recognizer.end();
      const data = recognizer.on("data", async (data: { text: string }) => {
        // Handle recognized text data
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        return await saveToMongoDB(data.text, req, currentChatId);
      });

      recognizer.on("end", () => {
        console.log("Speech recognition finished");
        if (data.success) {
          res.status(200).json({
            success: true,
            message: "File uploaded and processed successfully",
            chartId: data.chatId,
            email: data.email,
            multi: data.multi,
          });
        } else {
          res
            .status(400)
            .json({ success: false, message: "unable to perfrom operation" });
        }
      });

      recognizer.on("error", (err) => {
        console.error(err);
        res.status(500).json({ error: "Failed to transcribe audio/video" });
      });
      */
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
            if (data.success) {
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
          }
        }
      );
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Function to save text data to MongoDB
export async function saveToMongoDB(
  text: string,
  req: Request,
  chatId: mongoose.Types.ObjectId
) {
  let chunks = [];

  if (!useModel) {
    await loadUseModel();
  }

  // console.log(text);
  // if (Buffer.from(text).length > 16 * 1024 * 1024) {
  if (text.length >= 7000) {
    // Split the text into chunks if it exceeds 16MB
    chunks = await chunkPassage(
      text,
      500,
      0.8,
      useModel,
      new natural.SentenceTokenizer()
    );
  } else {
    chunks.push(text);
  }

  // const res: JwtPayload = jwt.verify(
  //   req.headers.authorization,
  //   process.env.REFRESH_TOKEN_SECRET!
  // ) as JwtPayload;
  // console.log(chunks);
  const chatResp = [];
  let multi = false;
  if (chunks.length > 0) {
    multi = true;
  }
  for (const chunk of chunks) {
    const chat = new UserChat({
      chatId: chatId,
      title: text.slice(0, 10),
      // email: res.decoded["email"],
      // fileName: req.file.originalname || " ",
      passage: chunk,
      multi,
    });

    chatResp.push(await chat.save());
  }
  return {
    success: true,
    email: chatResp[0].email,
    chatId: chatResp[0].chatId,
    multi,
  };
}
