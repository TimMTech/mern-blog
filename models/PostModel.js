const mongoose = require("mongoose")
const CommentTemplate = require("./CommentModel")

const PostTemplate = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    comments: {
        type: [],
        default: []
    },
    published: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    },
    imageUrl: {
        type: String
    },
    likes: {
        type: [],
        default: []
    },
    viewCounter: {
        type: Number,
        default: 0
    }
})

PostTemplate.post("findOneAndDelete", async function (doc) {
  if (doc) {
    const deleteCommentResult = await CommentTemplate.deleteMany({
      postId: doc._id,
    });
    console.log("COMMENTS DELETED", deleteCommentResult);
  }
});

module.exports = mongoose.models.Post ||  mongoose.model("Post", PostTemplate)