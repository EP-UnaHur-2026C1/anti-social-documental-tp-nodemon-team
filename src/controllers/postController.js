const Post = require('../models/postSchema');
const PostImage = require("../models/postImageSchema")

const getPost = async (req, res) => {
    try{
        const posts = await Post.find().populate("user", "nickname").populate("tags", "nombre")
        res.status(200).json(posts)
    }
    catch(error){
        res.status(500).json(error.message)
    }
}

const getPostById = async (req, res) => {
    try{
        const id = req.params.id
        const post = await Post.findById(id).populate("user", "nickname").populate("tags", "nombre")
        const images = await PostImage.find({ post: post._id })
        const commments = await Comment.find({
            post: post._id,
            }).populate("user", "nickName")
        res.status(200).json(post)
    }
    catch(error){
        res.status(500),json(error.message)
    }
}

const createPost = async (req, res) => {
    try{
        const post = req.body
        const newPost = await Post.create(post)
        res.status(201).json(newPost)
    }
    catch(error){
        res.status(500).json(error.message)
    }
}

const updatePost = async (req, res) =>{
    try{
        const id = req.params.id
        const post = await Post.findByIdAndUpdate(id, req.body, {new: true})
        res.status(200).json({message: "Post actualizado"})
    }
    catch(error){
        res.status(500).json(error.message)
    }
}

const deletePost = async (req, res) =>{
    try{
        const id = req.params.id
        const post = await Post.findByIdAndDelete(id)
        res.status(200).json({message: "Post eliminado"})
    }
    catch(error){
        res.status(500).json(error.message)
    }
}

module.exports = {getPost, getPostById, createPost, updatePost, deletePost}
