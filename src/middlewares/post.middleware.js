const Post = require("../models/postSchema")
const validarId = require("./validarId.middleware")

const validarPostById = validarId(Post)

module.exports = validarPostById