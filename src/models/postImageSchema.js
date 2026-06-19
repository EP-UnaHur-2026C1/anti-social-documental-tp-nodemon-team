const postImageSchema = new Schema({
  url: {
    type: String,
    required: [true, 'La URL de la imagen es obligatoria']
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
});

module.exports = mongoose.model('PostImage', postImageSchema);