import { Request, Response } from "express";
import { saveToMongoDB } from "../utils/database.js";
import mongoose from "mongoose";

export const textProcessing = async (req: Request, res: Response) => {
  try {
    const { passage } = req.body;
    // console.log(passage);
    if (!passage) {
      return res.status(400).json({
        success: false,
        error: "Missing passage in the request body.",
      });
    }
    const resp = await saveToMongoDB(
      passage,
      req,
      new mongoose.Types.ObjectId()
    );
    console.log(resp);
    // console.log(resp);
    res.json({
      success: true,
      message: "File uploaded and processed successfully",
      chatId: resp.chatId,
      email: resp.email,
      multi: resp.multi,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
