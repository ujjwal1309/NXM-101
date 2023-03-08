const express = require("express");
const { connection, UserModel } = require("./db");
require("dotenv").config()

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("This is home page");
});

//Gets all the users

server.get("/users", async (req, res) => {
  const query = req.query;
  try {
    const users = await UserModel.find();
    res.send(users);
  } catch (error) {
    res.send({ msg: "error", error: error.message });
  }
});

//Post the single user in database

server.post("/adduser", async (req, res) => {
  try {
    const user = new UserModel(req.body);
    await user.save();
    res.send({ msg: "data has been successfully added" });
  } catch (error) {
    res.send({ msg: "error", error: error.message });
  }
});

//Update the user by it's id

server.patch("/update/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await UserModel.findByIdAndUpdate({ _id: id }, req.body);
    res.send({ msg: "user has been successfully updated" });
  } catch (error) {
    res.send({ msg: "error", error: error.message });
  }
});

//Delete the user by it's id

server.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await UserModel.findByIdAndDelete({ _id: id });
    res.send({ msg: "user has been successfully deleted" });
  } catch (error) {
    res.send({ msg: "error", error: error.message });
  }
});

server.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to the database");
  } catch (error) {
    console.log("Can't connect to DB");
    console.log(error);
  }

  console.log("http://localhost:4000");
});
