const express = require("express");
const router = express.Router();

const Post = require("../models/posts.js");
const Comment = require("../models/comment.js");

// get to the home index.ejs page
router.get("/", (req, res) => {
  res.render("pages/index.ejs");
});

// This is the view all page
router.get("/viewAll", async (req, res) => {
  try {
    const allPosts = await Post.find({}).populate("author").sort({ createdAt: -1});
    
    const postsWithComments = await Promise.all(allPosts.map(async (post) => {
      const comments = await Comment.find({ post: post._id }).populate("author")
      return {...post.toObject(), comments}
    }))

    res.render("pages/viewAll.ejs", { posts: postsWithComments });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

//Getting to the forms page for a new post
router.get("/newPost", (req, res) => {
  try {
    res.render("pages/newPost.ejs");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// This allows you to create a new post
router.post("/", async (req, res) => {
  try {
    const postData = {
      ...req.body,
      author: req.session.user._id,
    };

    const post = new Post(postData);
    await post.save();
    res.redirect("/MyPage/viewAll");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// This allows view for a specific post
router.get("/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (post.author.toString() === req.session.user._id) {
      res.render("pages/show.ejs", { post });
    } else {
      res.redirect("/viewAll");
    }
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// This adds a comment to a specific post
router.post("/:postId/comments", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (post) {
      // This creates a new comment
      const newComment = new Comment({
        content: req.body.content,
        author: req.session.user._id,
        post: req.params.postId,
      });

      await newComment.save();
     // Add the comment to the specific id
      // post.comments.push(newComment._id);
      // await post.save();
      // Redirect back to viewAll after adding the comment
      res.redirect("/MyPage/viewAll");
    } 
  }catch (error) {
    console.log(error);
    res.redirect("/MyPage/viewAll");
  }
});
// I have to create a PUT for the the comment post. Also, create a form for a comments










module.exports = router;
