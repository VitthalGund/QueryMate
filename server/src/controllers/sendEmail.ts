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
