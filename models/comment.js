const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    author: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    post: {type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
    content: { type: String }
}, { timestamps: true } )

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;