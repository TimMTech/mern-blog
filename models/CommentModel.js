const mongoose = require("mongoose");

const CommentTemplate = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    maxlength: 30,
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
  likes: {
    type: [],
    default: [],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports =
  mongoose.models.Comment || mongoose.model("Comment", CommentTemplate);
