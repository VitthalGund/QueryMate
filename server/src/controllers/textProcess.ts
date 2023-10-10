import { Request, Response } from "express";
import { saveToMongoDB } from "./fileTextExtract.js";
import mongoose from "mongoose";

export const textProcessing = async (req: Request, res: Response) => {
  try {
    const { passage } = req.body;
    if (!passage) {
      return res.status(400).json({
        success: false,
        error: "Missing ChatId in the request body.",
      });
    }
    const resp = await saveToMongoDB(
      passage,
      req,
      new mongoose.Types.ObjectId()
    );
    if (resp.success) {
      res.json({
        success: true,
        message: "File uploaded and processed successfully",
        chartId: resp.chatId,
        email: resp.email,
      });
    } else {
      res
        .status(400)
        .json({ success: false, message: "unable to perfrom operation" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
