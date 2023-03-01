const express = require("express");
const { PostModel } = require("../models/post.model");

const postRouter = express.Router();

postRouter.get("/", async (req, res) => {
  try {
    const posts = PostModel.find({ user: req.body.userId });
    res.send(posts);
  } catch (error) {
    res.send({ msg: "error", error: error.message });
  }
});

postRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const note = await PostModel.find({ _id: id });
    res.send(note);
  } catch (error) {
    res.send({ msg: "error", error: error.message });
  }
});

postRouter.post("/add", async (req, res) => {
  const payload = req.body;
  try {
    const post = new PostModel(payload);
    await post.save();
    res.send({ msg: "Posts has been added" });
  } catch (error) {
    res.send({ msg: "error", error: error.message });
  }
});

postRouter.patch("/update/:id", async (req, res) => {
  const id = req.params.id;
  const payload = req.body;
  try {
    await PostModel.findByIdAndUpdate({ _id: id }, payload);
    res.send({ msg: "Post has been updated" });
  } catch (error) {
    res.send({ msg: "error", error: error.message });
  }
});

postRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await PostModel.findByIdAndDelete({ _id: id });
    res.send({ msg: "Post has been deleted" });
  } catch (error) {
    res.send({ msg: "error", error: error.message });
  }
});

module.exports = { postRouter };
