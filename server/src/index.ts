import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Welcome to QUERY-MATE!");
});
app.listen(port, () => console.log(`http://localhost:${port}!`));
