import express from "express";
import * as dotenv from "dotenv";
import { router } from "./routes/textQna.js";
import { verifyJWT } from "./middlewares/verifyJWT.js";
import Register from "./routes/resgister.js";
import Auth from "./routes/auth.js";
import Refresh from "./routes/refresh.js";
import Logout from "./routes/logout.js";
import ForgotPassword from "./routes/forgotPassword.js";
import UserInfo from "./routes/userinfo.js";

import FileProcess from "./routes/toText.js";
import GetMessage from "./routes/message.js";
import connectDB from "./config/dbConn.js";
// import { logger } from "./middlewares/logEvents.js";
import cors from "cors";
import corsOptions from "./config/corsOptions.js";
import cookieParser from "cookie-parser";
import { credentials } from "./middlewares/credentials.js";
// import errorHandler from "./middlewares/errorHandler.js";
import mongoose from "mongoose";
import bodyParser from "body-parser";
const app = express();
const PORT = 2000;

dotenv.config({
  encoding: "latin1",
  debug: true,
  override: false,
});

// Set up JSON body parsing middleware
// app.use(express.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "35mb",
    parameterLimit: 50000,
  })
);

// Connect to MongoDB
connectDB();

// custom middleware logger to log events in log directory
// app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: true }));

// built-in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

// set a cookie
app.use(function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  // check if client sent cookie
  const cookie = req.cookies.cookieName;
  if (cookie === undefined) {
    // no: set a new cookie
    let randomNumber = Math.random().toString();
    randomNumber = randomNumber.substring(2, randomNumber.length);
    res.cookie("cookieName", randomNumber, { maxAge: 900000, httpOnly: true });
    console.log("cookie created successfully");
  } else {
    // yes, cookie was already present
    console.log("cookie exists", cookie);
  }
  next();
});

// eslint-disable-next-line @typescript-eslint/no-var-requires
// app.use("/test", require("./routes/imageQna"));
// routes

app.use("/register", Register);
app.use("/auth", Auth);
app.use("/refresh", Refresh);
app.use("/logout", Logout);

app.get("/", (req, res) => {
  res.send("Welcome to Qna Boat");
});

// app.use("/sendmail", require("./routes/email")); //TODO
app.use("/password", ForgotPassword);
app.use(verifyJWT);
// app.use("/users", require("./routes/api/users"));
app.use("/userinfo", UserInfo);
// eslint-disable-next-line @typescript-eslint/no-var-requires
app.use("/model", router);
app.use("/messages", GetMessage);
app.use("/upload", FileProcess);

// app.use(errorHandler);
mongoose.connection.addListener("connected", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
  });
});
