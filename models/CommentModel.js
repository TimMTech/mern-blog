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
    }
})

module.exports = mongoose.models.Comment || mongoose.Schema("Comment", CommentTemplate)