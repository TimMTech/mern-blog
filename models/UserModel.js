const mongoose = require("mongoose")
const PostTemplate = require("./PostModel")
const CommentTemplate = require("./CommentModel")

const UserTemplate = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

UserTemplate.post("findOneAndDelete", async function (doc) {
    if (doc) {
        const deletePostResult = await PostTemplate.deleteMany({
            user: doc._id
        })
        console.log("POST DELETED", deletePostResult)
    }
})



module.exports = mongoose.models.User || mongoose.model("User", UserTemplate)