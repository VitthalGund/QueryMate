import { Request, Response } from "express";
import { User } from "../models/User.js";
import axios from "axios";
import jwt from "jsonwebtoken";

// working 100% right
export const handleGoogleAuth = async (req: Request, res: Response) => {
  try {
    const { googleAccessToken } = req.body;
    // console.log("Bearer " + googleAccessToken);
    if (!googleAccessToken) {
      return res
        .status(400)
        .json({ message: "insufficient agruments are required." });
    }

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
            isVerified: true,
            email,
            username: firstName + lastName,
            socialLogin: true,
          });
          existingUser = result;
        }
        const roles = Object.values(existingUser.roles).filter(Boolean);
        const authToken = jwt.sign(
          {
            UserInfo: {
              username: firstName + lastName,
              email: email,
              roles: roles,
            },
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "30h" }
        );
        const refreshToken = jwt.sign(
          {
            username: firstName + lastName,
            email: existingUser.email,
            roles: roles,
          },
          process.env.REFRESH_TOKEN_SECRET!,
          { expiresIn: "72h" }
        );

        res.cookie("jwt", refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 72 * 60 * 60 * 1000,
        });
        res.status(200).json({
          email: existingUser.email,
          username: existingUser.username,
          roles,
          success: true,
          accessToken: authToken,
        });
      })
      .catch((e) => {
        console.log(e);
        res.status(400).json({ message: "Invalid access token!" });
      });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
