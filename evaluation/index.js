const express = require("express");
const { connection } = require("./config/db");
const { booksRouter } = require("./routes/books.routes");
const {validator}=require("./middlewares/validator");
require("dotenv").config();

const app = express();

app.use(express.json())
app.use("/books",validator);
app.use("/books", booksRouter);

app.listen(process.env.port, async () => {
  console.log("server is running");
  try {
    await connection;
    console.log("Connected to the DB");
  } catch (error) {
    console.log("Can't connect to the DB");
    console.log(error);
  }
});
