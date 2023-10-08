import { Request, Response } from "express";
import textract from "textract";
import { UserChat } from "../models/Chat.js";
import jwt, { JwtPayload } from "jsonwebtoken";

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
              title: "",
            });
            res.json({
              status: "File uploaded and processed successfully",
              success: true,
              id: chat.id,
            });
          }
        );
      }
    }
  );
};
