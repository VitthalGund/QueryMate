import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

// Authentication of user is working 100% fine
const handleLogin = async (req: Request, res: Response) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email)
    return res
      .status(400)
      .json({ message: "Username,email and password are required." });
  // console.log(req.body)
  const foundUser = await User.findOne({ username: username });
  if (!foundUser) return res.sendStatus(401); //Unauthorized
  // check password with hash to evaluate password is correct or not
  const match = await bcrypt.compare(password, foundUser.password);
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
    // res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    // res.cookie('jwt', refreshToken, { httpOnly: true })
    // res.setHeader("Set-Cookie", `jwt=${refreshToken}; httpOnly=true; secure=true; sameSite=None; maxAge=${24 * 60 * 60 * 1000};`)
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });
    // Send authorization roles and access token to username
    res.json({ roles, authToken, refreshToken });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
