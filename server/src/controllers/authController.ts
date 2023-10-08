import { User } from "../models/User.js";
import bcryptjs from "bcryptjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import axios from "axios";

// Authentication of user is working 100% fine
export const handleLogin = async (req: Request, res: Response) => {
  if (req.body.googleAccessToken) {
    // gogole-auth
    const { googleAccessToken } = req.body;

    axios
      .get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          Authorization: `Bearer ${googleAccessToken}`,
        },
      })
      .then(async (response) => {
        // const firstName = response.data.given_name;
        // const lastName = response.data.family_name;
        const email = response.data.email;
        // const picture = response.data.picture;

        const existingUser = await User.findOne({ email });

        if (!existingUser)
          return res.status(404).json({ message: "User don't exist!" });

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
  } else {
    const { username, password, email } = req.body;
    if (!username || !password || !email)
      return res
        .status(400)
        .json({ message: "Username,email and password are required." });
    // console.log(req.body)
    const foundUser = await User.findOne({ username: username });
    if (!foundUser) return res.sendStatus(401); //Unauthorized
    // check password with hash to evaluate password is correct or not
    const match = await bcryptjs.compare(password, foundUser.password);
    // if password and email is correct then:
    if (match && foundUser.email === email) {
      const roles = Object.values(foundUser.roles).filter(Boolean);
      // 1. create JWTs
      const authToken = jwt.sign(
        {
          UserInfo: {
            username: foundUser.username,
            email: email,
            roles: roles,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "10m" }
      );
      // 2.create new refresh Token
      const refreshToken = jwt.sign(
        { username: foundUser.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );
      // 3.Saving refreshToken with current username
      foundUser.refreshToken = refreshToken;
      const result = await foundUser.save();
      console.log(result);

      // 4.Creates Secure Cookie with refresh token
      // res.setHeader("Set-Cookie", `jwt=${refreshToken}; httpOnly=true; secure=true; sameSite=None; maxAge=${24 * 60 * 60 * 1000};`)
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
      });
      // Send authorization roles and access token to username
      res.json({ roles, authToken, refreshToken, success: true });
    } else {
      res.sendStatus(401);
    }
  }
};
