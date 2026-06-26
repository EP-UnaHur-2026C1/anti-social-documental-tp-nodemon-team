const Comment = require("../models/commentSchema")
const Post = require("../models/postSchema")

const getAllComments = async(req,res)=>{
    try{
        const comments = await Comment.find().populate("user","nickname")
        res.status(200).json(comments)
    } catch(e){
        console.error(e)
        res.status(500).json(e.message)
    }
}
const getCommentById = async(req,res)=>{
    try{
        const id = req.params.id
        const comment = Comment.findById(id).populate("user","nickname")
        res.status(200).json(comment)
    } catch(e){
        console.error(e)
        res.status(500).json(e.message)
    }
}
const getCommentsByPost = async(req,res)=>{
    try{
        const postId = req.params
        const post =  await Post.findById(postId)
        const limiteMeses = Number(process.env.COMMENT_MES_LIMITE) || 6;
        const fechaLimite = new Date();
        fechaLimite.setMonth(fechaLimite.getMonth() - limiteMeses);
        const comments = await Comment.find({
            post: postId,
            createdAt: { $gte: fechaLimite },
        }).populate("user", "nickName")
        res.status(200).json(comments)
    } catch(e){
        console.error(e)
        res.status(500).json(e.message)
    }
}
const createComment = async (req, res) => {
    try {
        const postId = req.params.id;

        const comment = await Comment.create({
            ...req.body,
            post: postId
        });

        res.status(201).json(comment);
    } catch (e) {
        console.error(e);
        res.status(500).json(e.message);
    }
}
const updateComment = async(req,res)=>{
    try{
         const comment = await Comment.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
         )
         res.status(200).json(comment)
    } catch(e){
        console.error(e)
        res.status(500).json(e.message)
    }
}
const deleteComment = async(req,res)=>{
    try{
        const comment = await Comment.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"Comentario eliminado correctamente"})
    } catch(e){
        console.error(e)
        res.status(500).json(e.message)
    }
}
module.exports = {getAllComments,getCommentById,createComment,updateComment,deleteComment,getCommentsByPost}