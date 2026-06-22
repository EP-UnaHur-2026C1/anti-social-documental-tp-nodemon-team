const mongoose = require("mongoose")
const postImageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: [true, 'La URL de la imagen es obligatoria']
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
});
const PostImage = mongoose.model('PostImage', postImageSchema)
module.exports = PostImage