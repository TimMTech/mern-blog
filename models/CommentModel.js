const mongoose = require("mongoose")

const CommentTemplate = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        maxlength: 30
    },
    content: {
        type: String,
        required: true
    },
    postId: {
        type: String,
        required: true
    },
    commentId: {
        type: String,
        
    },
    commentReplies: {
        type: [],
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.models.Comment || mongoose.model("Comment", CommentTemplate)