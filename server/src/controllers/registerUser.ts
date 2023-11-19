import { Request, Response } from "express";
import { User } from "../models/User.js";
import bcryptjs from "bcryptjs";
import { sendEmail } from "./sendEmail.js";

// working 100% right
export const handleNewUser = async (req: Request, res: Response) => {
  try {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
      return res
        .status(400)
        .json({ message: "insufficient agruments are required." });
    }
    // console.log(req.body)

    // to check whether some user already exists with the given username
    const duplicate = await User.findOne({ username: username });
    // if the given email or username exists with this email and password send error message
    if (duplicate) return res.sendStatus(409); //Conflict
    // to check whether some user already exists with the given email
    const duplicate2 = await User.findOne({ email: email });
    // if the given email or username exists with this email and password send error message
    if (duplicate2) return res.sendStatus(409); //Conflict

    // before storing into database encrypt the password
    const hashedPwd = await bcryptjs.hash(password, 10);

    // create and store the new user details in database
    const result = await User.create({
      username: username,
      email: email,
      password: hashedPwd,
    });
    // console.log(result);
    const mail = await sendEmail({
      email,
      emailType: "VERIFY",
      userId: result._id,
    });
    // send response to the client
    res
      .status(201)
      .json({ success: true, message: `User created successfully!`, mail });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const verifyUser = async (req: Request, res: Response) => {
  try {
    const reqBody = req.body;
    const { token } = reqBody;
    // console.log(token);

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid token", success: false });
    }

    // console.log(user);

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    user.save();

    return res.json({
      message: "email Verified!",
      success: true,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
