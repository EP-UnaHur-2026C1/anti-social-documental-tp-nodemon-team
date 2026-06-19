const validarId = (modelo)=>{
    return async(req,res,next)=>{
        const id = req.params.id
        const instance = await modelo.findById(id)
        if (!typeof id === "string"){
            res.status(400).json({error_message: "El id debe ser de tipo String"})
        }
        else if(!instance){
            res.status(404).json({error_message: `El id ${id} no fue encontrado`})
            return
        }
        next()
    }
}
module.exports = validarId