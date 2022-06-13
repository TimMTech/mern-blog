const mongoose = require("mongoose")

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
    }
})

module.exports = mongoose.models.Post ||  mongoose.model("Post", PostTemplate)