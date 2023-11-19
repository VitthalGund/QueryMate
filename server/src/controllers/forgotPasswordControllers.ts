/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import { User } from "../models/User.js";
import { sendEmail } from "./sendEmail.js";
import bcryptjs from "bcryptjs";

export async function sendVerificationEmail(
  request: express.Request,
  res: express.Response
) {
  try {
    const { email } = await request.body;

    // console.log({ email });
    const id: string = (await User.findOne({ email }).select(
      "_id"
    )) as unknown as string;

    const mail = await sendEmail({ email, emailType: "FORGOT", userId: id });

    return res.json({
      message: "verification Email has been sent!",
      success: true,
      mail,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

/**
 * Handles a POST request to reset a user's password based on a token provided in the request body.
 * @param request - The request object containing the token and new password in the request body.
 * @returns A JSON response with a success message if the password reset was successful, or an error message if an error occurred.
 */
export async function verifyPassword(
  request: express.Request,
  res: express.Response
) {
  try {
    const { token, password } = await request.body;
    // console.log(token);

    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid token", success: true });
    }

    // console.log(user);

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // const resp =
    await User.findOneAndUpdate(
      {
        forgotPasswordToken: token,
        forgotPasswordTokenExpiry: { $gt: Date.now() },
      },
      {
        isVerified: true,
        forgotPasswordToken: undefined,
        forgotPasswordTokenExpiry: undefined,
        password: hashedPassword,
      }
    );

    return res.json({
      message: "Password changed successfully!",
      success: true,
      // info: resp,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message, success: true });
  }
}
