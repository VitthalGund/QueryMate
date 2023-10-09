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
import { Request, Response } from 'express';
import Tesseract from 'tesseract.js';
import { chunkPassage } from '../utils/passage.js'; // Import the chunking function
import mongoose from 'mongoose';
import { useModel } from "../routes/textQna.js";
import natural from "natural";
// import shortid from 'mongoose-shortid-nodeps'; // Import mongoose-shortid-nodeps
// Import Vosk speech-to-text
import vosk from 'vosk';
// require("../../MLModels/vosk-model-small-en-us-0.15")
export const extractText = async (req:Request, res:Response) => {
  const currentChatId = new mongoose.Types.ObjectId(); // Generate a new chatId for each file

  if (req.file.mimetype.startsWith('image/') || req.file.mimetype.startsWith('video/')) {
    // Handle image file
    const result = await Tesseract.recognize(req.file.path);
    await saveToMongoDB(result.data.text, req, currentChatId);
  } else if (req.file.mimetype.startsWith('audio/')) {
    // Handle audio or video file with Vosk speech-to-11
    const model = new vosk.Model();
    const recognizer = new vosk.Recognizer({ model: model });

    recognizer.write(req.file.buffer);
    recognizer.end();

    recognizer.on('data', async (data: { text: string; }) => {
      // Handle recognized text data
      await saveToMongoDB(data.text, req, currentChatId);
    });

    recognizer.on('end', () => {
      console.log('Speech recognition finished');
      res.json({ status: 'File uploaded and processed successfully' });
    });

    recognizer.on('error', (err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to transcribe audio/video' });
    });
  } else {
    // Handle other file types (e.g., PDF, DOC, TXT)
    textract.fromFileWithPath(req.file.path, async function (error, text) {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to extract text from file' });
      } else {
        await saveToMongoDB(text, req, currentChatId);
        console.log('Text saved to MongoDB');
        res.json({ status: 'File uploaded and processed successfully', text: text });
      }
    });
  }
};

// Function to save text data to MongoDB
async function saveToMongoDB(text:string, req:Request, chatId:mongoose.Types.ObjectId) {
  let chunks = [];

  if (Buffer.from(text).length > 16 * 1024 * 1024) {
    // Split the text into chunks if it exceeds 16MB 
    chunks = await chunkPassage(text, 16 * 1024 * 1024, 0.8,useModel,new natural.SentenceTokenizer());
  } else {
    chunks.push(text);
  }

  for (const chunk of chunks) {
    const chat = new UserChat({
      chatId: chatId,
      title: 'Your Title',
      email: 'example@email.com',
      fileName: req.file.originalname,
      passage: chunk,
    });

    await chat.save();
  }
}