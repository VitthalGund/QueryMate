import express from "express";
import * as dotenv from "dotenv";
import { router } from "./routes/textQna.js";
const app = express();
const port = 2000;

dotenv.config();

// Set up JSON body parsing middleware
app.use(express.json());

// eslint-disable-next-line @typescript-eslint/no-var-requires
app.use("/model", router);
// eslint-disable-next-line @typescript-eslint/no-var-requires
// app.use("/test", require("./routes/imageQna"));

app.get("/", (req, res) => {
  res.send("Welcome to Qna Boat");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
