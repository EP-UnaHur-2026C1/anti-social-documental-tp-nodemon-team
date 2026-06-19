const User = require("../models/userSchema")
const validarId = require("./validarId.middleware")

const validarUserById = validarId(User)

module.exports = validarUserById