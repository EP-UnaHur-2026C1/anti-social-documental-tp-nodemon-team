const Comment = require("../models/commentSchema")
const validarId = require("./validarId.middleware")

const validarCommentById = validarId(Comment)

module.exports = validarCommentById