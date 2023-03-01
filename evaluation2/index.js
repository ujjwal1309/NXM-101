const express = require("express");
const { connect } = require("mongoose");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.routes");
const cors = require("cors");
const { postRouter } = require("./routes/posts.routes");
const { authenticator } = require("./middlewares/authenticator");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/users", userRouter);
app.use(authenticator);
app.use("/posts", postRouter);

app.get("/", (req, res) => {
  res.send("HOME PAGE");
});

app.listen(process.env.port, async () => {
  console.log("server is running");
  try {
    await connection;
    console.log("Server is connected to DB");
  } catch (error) {
    console.log("DB isn't connected");
    console.log(error);
  }
});
