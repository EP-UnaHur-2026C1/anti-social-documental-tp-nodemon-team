const Tag = require("../models/tagSchema")
const validarId = require("./validarId.middleware")

const validarTagById = validarId(Tag)

module.exports = validarTagById