const mongoose = require("mongoose");
const PostTemplate = require("../models/PostModel");

const CommentTemplate = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  email: {
    type: String,
  },
  content: {
    type: String,
    required: true,
  },

  postId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Post",
  },
  commentId: {
    type: String,
  },
  commentReplies: {
    type: [],
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports =
  mongoose.models.Comment || mongoose.model("Comment", CommentTemplate);
