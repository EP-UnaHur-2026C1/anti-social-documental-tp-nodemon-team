const User = require("../models/userSchema")
const validarId = require("./validarId.middleware")

const validarUserById = validarId(User)


const validarUserByNickname = async(req,res,next)=>{
    const nickname = req.params.nickname
    const instance = await User.findOne({nickname: nickname})
    if (!typeof nickname === "string"){
            res.status(400).json({error_message: "El nickname debe ser de tipo String"})
        }
    else if(!instance){
            res.status(404).json({error_message: `El nickname ${nickname} no fue encontrado`})
            return
        }
    next()
}
module.exports = {validarUserById, validarUserByNickname}