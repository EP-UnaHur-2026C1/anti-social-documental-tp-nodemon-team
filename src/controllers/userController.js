const User = require('../models/userSchema');

const getUsers = async (req, res) =>{
    try{
        const users = await User.find()
        if(!users){
            return res.status(404).json({message: "Usuarios no encontrados"})
        }
        res.status(200).json(users)
    }
    catch(error){
        res.status(500).json(e.message)
    }
}

const getUserById = async (req, res) =>{
    try{
        const id = req.params.id
        const user = await User.findById(id)
        if(!user){
            return res.status(404).json({message: "No se encontró el usuario"})
        }
        res.status(200).json(user)
    }
    catch(error){
        res.status(500).json(e.message)
    }
}

const createUser = async (req, res) =>{
    try{
        const user = await User.create(req.body)
        if(!user){
            return res.status(400).json({message: "error al crear usuario"})
        }
        res.status(201).json({message: "Usuario creado"})
    }
    catch(error){
        res.status(500).json(e.error)
    }
}

const updateUser = async (req, res) =>{
    try{
        const id = req.params.id
        const user = await User.findByIdAndUpdate(id, req.body, {new: true})
        if(!user){
            return res.status(400).json({message: "Error al actualizar usuario"})
        }
        res.status(200).json({message: "Usuario actualizado"})
    }
    catch(error){
        res.status(500).json(e.message)
    }
}

const deleteUser = async (req, res) =>{
    try{
        const id = req.params.id
        const user = await User.findByIdAndDelete(id)
        if(!user){
            return res.status(400).json({message: "No se pudo eliminar usuario"})
        }
        res.status(200).json({message: "Usuario eliminado"})
    }
    catch(error){
        res.status(500).json(e.message)
    }
}

module.exports = {getUsers, getUserById, createUser, updateUser, deleteUser}