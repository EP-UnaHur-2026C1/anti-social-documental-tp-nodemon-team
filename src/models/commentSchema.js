const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    contenido: {type: String, required: true},
    estado: {type: Boolean, required: true}
})

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
