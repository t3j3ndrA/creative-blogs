const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    author: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    featuredImage: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const post = mongoose.model("posts", postsSchema);
module.exports = post;
