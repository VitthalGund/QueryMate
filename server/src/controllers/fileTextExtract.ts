/* eslint-disable no-inner-declarations */
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
import vosk from "vosk";
// require("../../MLModels/vosk-model-small-en-us-0.15")
import { loadUseModel } from "../routes/textQna.js";

// import deepspeech from "deepspeech";
import fs from "fs";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import stt from "stt";
import { exec } from "child_process";

export const extractText = async (req: Request, res: Response) => {
  const currentChatId = new mongoose.Types.ObjectId(); // Generate a new chatId for each file
  console.log(req.file.path);
  try {
    if (req.file.mimetype.startsWith("image/")) {
      // Handle image file
      const result = await Tesseract.recognize(req.file.path);
      const data = await saveToMongoDB(result.data.text, req, currentChatId);
      res.status(200).json({
        success: true,
        message: "File uploaded and processed successfully",
        chartId: data.chatId,
        email: data.email,
        multi: data.multi,
      });
    } else if (req.file.mimetype.startsWith("audio/")) {
      const textOutput = await extractTextFromAudio(req.file.buffer);
      if (textOutput.success) {
        const data = await saveToMongoDB(textOutput.text, req, currentChatId);
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
        currentChatId
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
  if (text.length >= 4000) {
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
    email: chatResp[0].email,
    chatId: chatResp[0].chatId,
    multi,
  };
}

async function extractTextFromAudio(audioBuffer: Buffer) {
  try {
    // Initialize Vosk model
    const model = new vosk.Model("../../MLModels/vosk-model-small-en-in-0.4");

    // Perform speech-to-text using Vosk
    const recognizer = new vosk.Recognizer({ model: model });
    recognizer.acceptWaveform(audioBuffer);

    const text = recognizer.result();
    return { text, success: true };
  } catch (error) {
    console.error("Error transcribing audio:", error);
    return { success: false };
  }
}
// Function to extract audio from a video and return it as a buffer
async function extractAudioFromVideo(videoPath: string): Promise<Buffer> {
  return new Promise<Buffer>((resolve, reject) => {
    const audioData: Uint8Array[] = [];

    // FFmpeg command to extract audio as a raw PCM stream
    const ffmpegCmd = `ffmpeg -i ${videoPath} -f s16le -acodec pcm_s16le -ar 44100 -ac 2 pipe:1`;

    const process = exec(ffmpegCmd);

    process.on("error", (error) => {
      reject(error);
    });

    process.on("exit", (code) => {
      if (code === 0) {
        const audioBuffer = Buffer.concat(audioData);
        resolve(audioBuffer);
      } else {
        reject(new Error("Failed to extract audio from video."));
      }
    });

    process.stdout.on("data", (chunk) => {
      audioData.push(new Uint8Array(chunk));
    });
  });
}

// Function to extract text from a video frame using Tesseract.js
async function extractTextFromVideoFrame(
  frameImagePath: string
): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    Tesseract.recognize(frameImagePath)
      .then(({ data: { text } }) => {
        resolve(text);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Function to extract text from a video using Tesseract.js
async function extractTextFromVideo(videoPath) {
  return new Promise((resolve, reject) => {
    const framesDirectory = "/path/to/frames"; // Directory to store extracted frames

    // Extract frames from the video
    const frameCmd = `ffmpeg -i ${videoPath} -vf "fps=1" ${framesDirectory}/frame-%04d.png`;

    exec(frameCmd, (error) => {
      if (error) {
        reject(error);
      } else {
        const uniqueTextSet = new Set(); // Store unique text content

        // Process each frame using Tesseract.js
        fs.readdir(framesDirectory, async (err, files) => {
          if (err) {
            reject(err);
          }

          for (const file of files) {
            const frameImagePath = `${framesDirectory}/${file}`;
            const frameText = await extractTextFromVideoFrame(frameImagePath);
            uniqueTextSet.add(frameText); // Store unique text in the set
          }

          const uniqueTextArray = Array.from(uniqueTextSet); // Convert to an array
          const fullText = uniqueTextArray.join("\n");
          resolve(fullText);
        });
      }
    });
  });
}
