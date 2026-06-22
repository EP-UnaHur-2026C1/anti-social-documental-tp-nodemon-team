const Tag = require("../models/tagSchema")

const createTag = async (req, res)=>{
    try{
        const data = req.body
        const tag = await Tag.create(data)
        res.status(201).json(tag)
    }catch(e){
        res.status(500).json(e.message)
    }
}

const findById = async (req, res) =>{
    try{

        const id = req.params.id
        const tag = await Tag.findById(id)
        res.status(200).json(tag)
    } catch(e){
        res.status(500).json(e.message)
    }
}

const findAll = async(req, res) =>{
    try{
    const data = await Tag.find()
    res.status(200).json(data)
    }catch(e){
        res.status(500).json(e.message)
    }
}

const editTag = async(req, res) =>{
    try{ 
    const id = req.params.id
    const tag = await Tag.findByIdAndUpdate(id, req.body, {new:true})
    res.status(200).json({message: "Tag editado"})
    } catch(e){
        res.status(500).json(e.message)
    }
}

const deleteTag = async(req, res) =>{
    try{
    const id = req.params.id
    const tag = await Tag.findByIdAndDelete(id)
    res.status(200).json({message:"Tag eliminado"})
    }catch(e){
        res.status(500).json(e.message)
    }
}

module.exports = {createTag, findById, findAll, editTag, deleteTag}