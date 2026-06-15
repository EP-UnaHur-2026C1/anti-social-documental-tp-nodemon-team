const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User",required: true},
    comment:{type: mongoose.Schema.Types.ObjectId, ref: "Comment", required: true},
    tag:{type: mongoose.Schema.Types.ObjectId, ref: "Tag", required: true},
    postImages: [
        {
            url: {type: String, required: true}
        }
    ] 
})

const Post = mongoose.model("Post", postSchema)

module.exports = Post;