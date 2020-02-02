const express = require("express");
const Post = require("../models/post");

const postsRouter = express.Router();

postsRouter
  .get("/", (req, res) => {
    Post.find({}).exec().then(data => {
      res.status(200).json({posts: data});
    }).catch(err => {
      console.error(err);
      res.status(500).send("Internal Server Error!");
    });
  })
  .get("/:id", (req, res) => {
    const { id = "" } = req.params;

    Post.findOne({ id }).exec().then(data => {
      res.status(200).json({post: data});
    }).catch(err => {
      console.error(err);
      res.status(500).send("Internal Server Error!");
    });
  });

module.exports = postsRouter;