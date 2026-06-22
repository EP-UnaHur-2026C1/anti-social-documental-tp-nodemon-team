const Post = require('../models/postSchema');
const PostImage = require("../models/postImageSchema")
const Comment = require("../models/commentSchema")
const Tag = require("../models/tagSchema")
const User = require("../models/userSchema")

const calcularLimiteVisibilidad = () => {
  const limiteMeses = Number(process.env.COMMENT_VISIBILITY_MONTHS) || 6;
  const fechaLimite = new Date();
  fechaLimite.setMonth(fechaLimite.getMonth() - limiteMeses);
  return fechaLimite;
}
const resolverTagIds = async (tags = []) => {
  return Promise.all(
    tags.map(async (tagName) => {
      const tag = await Tag.findOneAndUpdate(
        { nombre: tagName },
        { $setOnInsert: { name: tagName } },
        { upsert: true, new: true }
      );
      return tag._id;
    })
  );
}

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
        const comments = await Comment.find({
            post: post._id,
            createdAt: { $gte: calcularLimiteVisibilidad() }
            }).populate("user", "nickName")
        res.status(200).json({...post.toJSON(),images,comments})
    }
    catch(error){
        res.status(500).json(error.message)
    }
}

const createPost = async (req, res) => {
    try{
        const {nickname,contenido,tags=[]} = req.body
        const user = await User.findOne({nickname})
        const tagIds = await resolverTagIds(tags)
        const newPost = await Post.create({user: user._id,contenido,tags: tagIds})
        const post = await Post.findById(newPost._id).populate("user", "nickname").populate("tags", "nombre");
        res.status(201).json(post)
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
        const post = await Post.findById(id)
        await Comment.deleteMany({ post: post._id });
        await PostImage.deleteMany({ post: post._id });
        await Post.findByIdAndDelete(post._id);
        res.status(200).json({message: "Post eliminado"})
    }
    catch(error){
        res.status(500).json(error.message)
    }
}

module.exports = {getPost, getPostById, createPost, updatePost, deletePost}
