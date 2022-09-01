const mongoose = require("mongoose");
const PostTemplate = require("../models/PostModel");

const CommentTemplate = new mongoose.Schema({
  user: {
    type: String,
  },
  email: {
    type: String,
  },
  content: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
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
