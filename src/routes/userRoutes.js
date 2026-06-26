const {Router} = require('express')
const router = Router()
const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getUserByNickname
} = require('../controllers/userController')
const {validarUserById, validarUserByNickname} = require("../middlewares/user.middleware")

router.get('/', getUsers)
router.get("/:nickname", validarUserByNickname, getUserByNickname)
router.get('/id/:id', validarUserById, getUserById)
router.post('/', createUser)
router.put('/id/:id', validarUserById, updateUser)
router.delete('/id/:id', validarUserById, deleteUser)

module.exports = router