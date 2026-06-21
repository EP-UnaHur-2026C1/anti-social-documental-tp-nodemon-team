const {Router} = require('express')
const router = Router()
const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/userController')
const validarUserById = require("../middlewares/user.middleware")

router.get('/', getUsers)
router.get('/:id', validarUserById, getUserById)
router.post('/', createUser)
router.put('/:id', validarUserById, updateUser)
router.delete('/:id', validarUserById, deleteUser)

module.exports = router