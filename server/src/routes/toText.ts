import express from "express";
const router = express.Router();
import path from "path";
import multer from "multer";
import { extractText } from "../controllers/fileTextExtract.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage });

router.post("/upload", upload.single("file"), extractText);

export default router;
