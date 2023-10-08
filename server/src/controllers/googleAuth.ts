import { Request, Response } from "express";
import { User } from "../models/User.js";
import axios from "axios";
import jwt from "jsonwebtoken";

// working 100% right
export const handleGoogleAuth = async (req: Request, res: Response) => {
  try {
    if (req.body.googleAccessToken) {
      return res
        .status(400)
        .json({ message: "insufficient agruments are required." });
    }

    const { googleAccessToken } = req.body;

    axios
      .get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          Authorization: `Bearer ${googleAccessToken}`,
        },
      })
      .then(async (response) => {
        const firstName = response.data.given_name;
        const lastName = response.data.family_name;
        const email = response.data.email;
        // const picture = response.data.picture;

        let existingUser = await User.findOne({ email });

        if (!existingUser) {
          const result = await User.create({
            verified: true,
            email,
            username: firstName + lastName,
          });
          existingUser = result;
        }

        const token = jwt.sign(
          {
            email: existingUser.email,
            id: existingUser._id,
          },
          process.env.REFRESH_TOKEN_SECRET!,
          { expiresIn: "1h" }
        );

        res.status(200).json({ result: existingUser, token, success: true });
      })
      .catch(() => {
        res.status(400).json({ message: "Invalid access token!" });
      });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
