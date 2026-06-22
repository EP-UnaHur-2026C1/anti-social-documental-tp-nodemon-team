const validarId = (modelo)=>{

    function esAlfanumerico(valor) {
    const regexAlfanumerico = /^[a-zA-Z0-9]+$/;
     return regexAlfanumerico.test(valor);
}
    return async(req,res,next)=>{
        const id = req.params.id
        const instance = await modelo.findById(id)
        if (!esAlfanumerico(id)){
            res.status(400).json({error_message: "El id debe ser alfanumerico"})
        }
        else if(!instance){
            res.status(404).json({error_message: `El id ${id} no fue encontrado`})
            return
        }
        next()
    }
}
module.exports = validarId