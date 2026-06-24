const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    contenido: {
        type: String,
        required: [true, 'El texto del post es obligatorio']
    },
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag"
    }]
}, {
    timestamps: true
});

const Post = mongoose.model("Post", postSchema)

module.exports = Post;