import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import { User } from "../models/User.js";
import { Types } from "mongoose";

export const sendEmail = async ({
  email,
  emailType,
  userId,
}: {
  email: string;
  emailType: string;
  userId: Types.ObjectId | string;
}) => {
  console.log({ email, emailType, userId });
  try {
    // create hashed token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
      console.log("verified");
    } else if (emailType === "FORGOT") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp-relay.sendinblue.com",
      port: 587,
      auth: {
        user: process.env.email,
        pass: process.env.password,
      },
    });

    const mailOptions = {
      from: process.env.email,
      to: email,
      subject:
        emailType === "VERIFY"
          ? "Account verification email!"
          : "Reset password email!",
      html: `<p>Click <a href="${process.env.CLIENT_DOMAIN}/${
        emailType === "VERIFY" ? "verify" : "password"
      }?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      } or copy and paste the link below in your browser. <br> ${
        process.env.CLIENT_DOMAIN
      }/${
        emailType === "VERIFY" ? "verify" : "password"
      }?token=${hashedToken} </p>`,
    };

    // console.log("66:" + mailOptions);

    return transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return { ...error, success: false };
      } else {
        console.log("Email sent: " + info.response);
        return { ...info, success: true };
      }
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message);
  }
};

/*
import { createTransport } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport/index.js";

const transporter = createTransport({
  host: "smtp-relay.sendinblue.com",
  port: 587,
  auth: {
    user: process.env.email,
    pass: process.env.smtpKey,
  },
});

type mailOptions = {
  from: string;
  to: string;
  subject: string;
  text: string;
  html?: string;
};

type mailResponse = {
  success: boolean;
  info?: SMTPTransport.SentMessageInfo;
  error?: Error;
};

export const sendEemail = (mailOptions: mailOptions): mailResponse => {
  let mailresponse: mailResponse;

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      mailresponse = {
        success: false,
        error,
      };
    } else {
      console.log("Email sent: " + info.response);
      return {
        success: true,
        info,
      };
    }
  });
  
  return mailresponse;
};

*/
