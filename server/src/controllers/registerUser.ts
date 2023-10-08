import { Request, Response } from "express";
import { User } from "../models/User.js";
import bcryptjs from "bcryptjs";
import { sendEmail } from "./sendEmail.js";
import axios from "axios";
import jwt from "jsonwebtoken";

// working 100% right
export const handleNewUser = async (req: Request, res: Response) => {
  try {
    if (req.body.googleAccessToken) {
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

          const existingUser = await User.findOne({ email });

          if (existingUser)
            return res.status(400).json({ message: "User already exist!" });

          const result = await User.create({
            verified: true,
            email,
            username: firstName + lastName,
          });

          const token = jwt.sign(
            {
              email: result.email,
              id: result._id,
            },
            process.env.REFRESH_TOKEN_SECRET!,
            { expiresIn: "1h" }
          );

          res.status(200).json({ result, token });
        })
        .catch(() => {
          res.status(400).json({ message: "Invalid access token!" });
        });
    } else {
      const { username, password, email } = req.body;
      if (!username || !password || !email) {
        return res
          .status(400)
          .json({ message: "insufficient agruments are required." });
      }
      // console.log(req.body)

      // to check whether some user already exists with the given email and username
      const duplicate = await User.findOne({ username: username });
      // if the given email or username exists with this email and password send error message
      if (duplicate) return res.sendStatus(409); //Conflict
      // to check whether some user already exists with the given email and username
      const duplicate2 = await User.findOne({ username: username });
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
    }
  } catch (err) {
    res.status(500).json({ success: true, message: err.message });
  }
};
