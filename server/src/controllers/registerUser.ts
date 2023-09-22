import { Request, Response } from "express";
import { User } from "../models/User.js";
import bcrypt from "bcrypt";

// working 100% right
const handleNewUser = async (req: Request, res: Response) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email)
    return res
      .status(400)
      .json({ message: "User name and password are required." });
  // console.log(req.body)

  // to check whether some user already exists with the given email and username
  const duplicate = await User.findOne({ username: username });
  // if the given email or username exists with this email and password send error message
  if (duplicate) return res.sendStatus(409); //Conflict
  // to check whether some user already exists with the given email and username
  const duplicate2 = await User.findOne({ username: username });
  // if the given email or username exists with this email and password send error message
  if (duplicate2) return res.sendStatus(409); //Conflict

  try {
    // before storing into database encrypt the password
    const hashedPwd = await bcrypt.hash(password, 10);

    // create and store the new user details in database
    const result = await User.create({
      username: username,
      email: email,
      password: hashedPwd,
    });
    console.log(result);
    // send response to the client
    res.status(201).json({ success: `New user ${username} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
