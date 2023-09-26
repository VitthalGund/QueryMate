import express from "express";
const router = express.Router();
import { Request, Response } from "express";
import fs from "fs";
import multer from "multer";
import { User } from "../models/User.js";

// SET STORAGE
const storage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });

const uploadToDataBase = async (
  file: Express.Multer.File,
  username: string,
  email: string
) => {
  if (file && username && email) {
    console.table(file);
    const img = fs.readFileSync(file.path);
    const encode_img = img.toString("base64");
    // let final_img = {
    //     contentType: req.file.mimetype,
    //     image: new Buffer.alloc(req.file.size, encode_img, 'base64')
    // };
    const resp = await User.findOneAndUpdate(
      { username, email },
      {
        $set: {
          userProfileImage: Buffer.alloc(file.size, encode_img, "base64"),
        },
      }
    ).catch((erro) => {
      return erro;
    });
    fs.unlinkSync(file.path);
    return { success: true, resp };
  }
  return { success: false };
};

router.put(
  "/profileimage",
  upload.single("profilePic"),
  async (req: Request, res: Response) => {
    const data = await uploadToDataBase(
      req.file,
      req.body.username,
      req.body.email
    );
    if (data.success) {
      res.json(data.resp);
    } else {
      res.status(500).send("unable to upload the image");
    }
  }
);

router.get("/:username", (req, res) => {
  User.find({ username: req.params.username }).then((resp) => {
    res.json({ resp });
  });
});

router.get("/image/:username", (req, res) => {
  User.findOne(
    { username: req.params.username },
    { userProfileImage: 1, _id: 0 }
  ).then((resp) => {
    res.json({ resp });
  });
});

router.put("/update", (req, res) => {
  res.json({ todo: "TODO", status: true });
});

export default router;
