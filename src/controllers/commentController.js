const Comment = require("../models/commentSchema")

const getAllComments = async(req,res)=>{
    try{
        const comments = await Comment.find().populate("user","nickname")
        res.status(200).json(comments)
    } catch(e){
        res.status(500).json({message: "Error al encontrar los comentarios"})
    }
}
const getCommentById = async(req,res)=>{
    try{
        const id = req.params.id
        const comment = Comment.findById(id).populate("user","nickname")
        if(!comment){
            res.status(404).json({message: "Comentario no encontrado"})
        }
        res.status(200).json(comment)
    } catch(e){
        res.status(500).json({message: "Error al buscar comentario"})
    }
}
const createComment = async(req, res) =>{
    try{
        const comment = await Comment.create(req.body)
        res.status(201).json(comment)
    } catch(e){
        res.status(500).json({message: "Error al crear comentario"})
    }
    
}
const updateComment = async(req,res)=>{
    try{
         const comment = await Commment.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
         )
         if(!comment){
            res.status(404).json({message: "Comentario no encontrado"})
         }
         res.status(200).json(comment)
    } catch(e){
        res.status(500).json({message: "Error al actualizar comentario"})
    }
}
const deleteComment = async(req,res)=>{
    try{
        const comment = await Comment.findByIdAndDelete(req.params.id)
        if(!comment){
            res.status(404).json({message:"Comentario no encontrado"})
        }
        res.status(200).json({message:"Comentario eliminado correctamente"})
    } catch(e){
        res.status(500).json({message:"Error al eliminar comentario"})
    }
}
module.exports = {getAllComments,getCommentById,createComment,updateComment,deleteComment}