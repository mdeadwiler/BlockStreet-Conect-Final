const express = require("express");
const router = express.Router();

const Post = require("../models/posts.js");
const Comment = require("../models/comment.js");

// get to the home index.ejs page
router.get("/", (req, res) => {
  res.render("pages/index.ejs");
});

// This is the view all page && this allows the authors post to reference the cmments to the specifi post from top-bottom
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

// This allows view for a specific post, edit, & update
router.get("/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (post.author.toString() === req.session.user._id) {
      res.render("pages/edit.ejs", { post });
    } else {
      res.redirect("/MyPage/viewAll");
    }
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

//EDIT THE SPECIFIC POST
router.get("/:postId/edit", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId).populate("author");
    if (post.author.toString() === req.session.user._id) {
      res.render("pages/edit.ejs", { post });
    } else {
      res.redirect("/MyPage/viewAll");
    }
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});
//Update
router.put("/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    console.log(post);
    console.log(req.body);
    if (post.author.toString() === req.session.user._id) {
      await Post.findByIdAndUpdate(req.params.postId, req.body);
      res.redirect("/MyPage/viewAll");
    } else {
      res.redirect("/MyPage/edit.ejs");
    }
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});





//This is my Update router
/*router.put("/MyPage/:postId", async (req, res) => {
  try {
      await Post.findByIdAndUpdate(req.params.postId, req.body, { new: true });
      res.redirect("/viewAll"); 
  } catch (error) {
      console.log(error);
      res.redirect("/MyPage");
  }
});*/



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

// DELETE A SPECIFIC BLOG

router.delete("/:postId", async (req, res) => {
  console.log(req.params);
  try {
    const post = await Post.findById(req.params.postId);
    if (post.author.toString() === req.session.user._id) {
      await Post.findByIdAndDelete(req.params.postId);
      res.redirect("/MyPage/viewAll");
    } else {
      console.log("hello");
      res.redirect("/MyPage/viewAll");
    }
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

//This will allow user to edit post










module.exports = router;
