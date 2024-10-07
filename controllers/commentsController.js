const express = require("express");
const router = express.Router();

const Comments = require("../models/comment.js");

router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find({});
    res.render("pages/viewAll.ejs", { comments });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.post("/", async (req, res) => {
  try {
    const commentCreated = new Comment(req.body);
    const commentsInDB = await Comments.find({});

    const found = commentsInDB.find((comment) => {
      return (
        comment.name.toLowerCase() === commentCreated.name.toLowerCase()
      );
    });
    if (found) {
      return res.redirect("/viewAll");
    }
    await commentCreated.save();
    res.redirect("/viewAll");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

module.exports = router;

