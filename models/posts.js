const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    content: {
      type: String,
    },
  },
  { timestamps: true }
);
const Comment = mongoose.model("Comment", commentSchema);


const postSchema = mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",

    },
    content: { type: String, required: true },
  },
  // { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = { Post, Comment };
