const express = require("express");
const fs = require("fs");
const { TimeLogger, Logger } = require("./Middleware/Loggers");
const { studentRouter } = require("./router/student.router");
const { isDate } = require("util/types");
const server = express();

const check = (req, res, next) => {
  if (req.url === "/add") {
    // req.body.stamp="";
    console.log(req.body.stamp);
  }
  next();
};

server.use(TimeLogger, Logger);
server.use("/student", studentRouter);

server.get("/", (req, res) => {
  res.send("Welcome\nThis is home page");
});

server.post("/add", (req, res) => {
  console.log(req.body);
  res.send("data has been successfully added");
});

server.get("/data", (req, res) => {
  const data = fs.createReadStream("./db.json", "utf-8");
  data.pipe(res);
});

server.get("/weather", (req, res) => {
  //------------------------------------------------------------------------------------------->
  //This is how query works
  //------------------------------------------------------------------------------------------->
  const temp = {
    delhi: "14C",
    mumbai: "20C",
    pune: "30C",
  };
  const { city } = req.query;
  res.send(`Temperature of ${city} is ${temp[city]}`);
});

//------------------------------------------------------------------------------------------->
//This is how params work
//------------------------------------------------------------------------------------------->

server.get("/teacher/:id", (req, res) => {
  let para = req.params.id;
  res.send(`Details of teacher : ${para}`);
});

server.listen(4000, () => {
  console.log(`http://localhost:4000/`);
  console.log("server is running");
});
