const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User",required: true},
    comment:{},
    tag:{},
    postImages: [
        {
            url: {type: String, required: true}
        }
    ] 
})

const Post = mongoose.model("Post", postSchema)

module.exports = Post;