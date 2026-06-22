const PostImage = require("../models/postImageSchema")
const validarId = require("./validarId.middleware")

const validarPostImageById = validarId(PostImage)

module.exports = validarPostImageById
