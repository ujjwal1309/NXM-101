const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    title: String,
    body: String,
    device: String,
    user: String,
  },
  {
    versionKey: false,
  }
);

const PostModel = mongoose.model("post", postSchema);

module.exports = { PostModel };