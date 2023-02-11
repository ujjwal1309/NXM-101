const express = require("express");
const fs = require("fs");

const todoRouter = express.Router();

todoRouter.get("/", (req, res) => {
  res.send("This is all todos");
});

todoRouter.post("/add", (req, res) => {
  const todos = JSON.parse(fs.readFileSync("./db.json", "utf-8"));

  todos.push(req.body);

  fs.writeFileSync("./db.json", JSON.stringify(todos));

  res.send({ msg: "Todo has been successfully added" });
});

module.exports = { todoRouter };
