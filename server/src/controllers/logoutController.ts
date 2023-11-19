import { User } from "../models/User.js";
import { Request, Response } from "express";

export const handleLogout = async (req: Request, res: Response) => {
  // On client, also delete the accessToken to logout the user

  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  const refreshToken = cookies.jwt;

  // to check where the refreshToken in database?
  const foundUser = await User.findOne({ refreshToken });
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
    return res.sendStatus(204);
  }

  // if refreshTokem found, Delete refreshToken in database
  foundUser.refreshToken = "";
  await foundUser.save();
  // const result = await foundUser.save();
  // console.log(result);

  res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
  res.sendStatus(204);
};
