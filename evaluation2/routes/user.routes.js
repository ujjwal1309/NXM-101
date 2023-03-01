const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { name, email, gender, password } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        console.log(err);
      } else {
        const user = new UserModel({ name, email, gender, password: hash });
        await user.save();
        res.send({ msg: "User has been registered" });
      }
    });
  } catch (error) {
    res.send({ msg: "error", error: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email });
    if (user.length) {
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (result) {
          jwt.sign({ user: user[0]._id }, "ssj", (err, token) => {
            if (err) {
              console.log(err);
            } else {
              res.send({ msg: "Login success", token: token });
            }
          });
          console.log(result);
        } else {
          res.send({ msg: "wrong password" });
        }
      });
    } else {
      res.send({ msg: "Username and password doesn't match" });
    }
  } catch (error) {
    res.send({ msg: "error", error: error.message });
  }
});

module.exports = { userRouter };
