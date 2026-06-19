const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User",required: true},
    tags:{type: mongoose.Schema.Types.ObjectId, ref: "Tag", required: true}
},
 {
    timestamps: true
 })

const Post = mongoose.model("Post", postSchema)

module.exports = Post;