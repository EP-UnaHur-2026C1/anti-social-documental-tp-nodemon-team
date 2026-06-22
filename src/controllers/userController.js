const User = require('../models/userSchema');

const getUsers = async (req, res) =>{
    try{
        const users = await User.find()
        res.status(200).json(users)
    }
    catch(error){
        res.status(500).json(error.message)
    }
}

const getUserById = async (req, res) =>{
    try{
        const id = req.params.id
        const user = await User.findById(id)
        res.status(200).json(user)
    }
    catch(error){
        res.status(500).json(error.message)
    }
}


const getUserByNickname = async(req,res)=>{
    try{
        const nickname = req.params.nickname
        const user = await User.findOne({nickname: nickname})
        res.status(200).json(user)
    } catch(e){
        res.status(500).json(error.message)
    }
}
const createUser = async (req, res) =>{
    try{
        const user = await User.create(req.body)
        res.status(201).json(user)
    }
    catch(error){
        res.status(500).json(error.message)
    }
}

const updateUser = async (req, res) =>{
    try{
        const id = req.params.id
        const user = await User.findByIdAndUpdate(id, req.body, {new: true})
        res.status(200).json({message: "Usuario actualizado"})
    }
    catch(error){
        res.status(500).json(error.message)
    }
}

const deleteUser = async (req, res) =>{
    try{
        const id = req.params.id
        const user = await User.findByIdAndDelete(id)
        res.status(200).json({message: "Usuario eliminado"})
    }
    catch(error){
        res.status(500).json(error.message)
    }
}

module.exports = {getUsers, getUserById, createUser, updateUser, deleteUser, getUserByNickname}