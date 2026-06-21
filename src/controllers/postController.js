const Post = require('../models/postSchema');

const getPost = async (req, res) => {
    try{
        const posts = await Post.find()
        res.status(200).json(posts)
    }
    catch(error){
        res.status(500).json(error.message)
    }
}

const getPostById = async (req, res) => {
    try{
        const id = req.params.id
        const post = await Post.findById(id)
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
