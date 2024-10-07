const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    author: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    post: {type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
    content: { type: String }
}, { timestamps: true } )

// This allows my commentSchema used multiple times. It is already created. Now, this allows it to use the same schema for my subSchema in my postSchema
const Comment = mongoose.models.Comment || mongoose.model("Comment", commentSchema);
module.exports = Comment;