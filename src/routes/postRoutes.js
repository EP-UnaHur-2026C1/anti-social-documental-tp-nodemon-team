const {Router} = require('express')
const router = Router()
const validarPostById = require("../middlewares/post.middleware")

const {
    getPost,
    getPostById,
    createPost,
    updatePost,
    deletePost
} = require('../controllers/postController')
const { createComment,getCommentsByPost } = require('../controllers/commentController')
const validarCommentById = require('../middlewares/comment.middleware')

router.get('/', getPost)
router.get('/:id', validarPostById, getPostById)
router.get("/:id", validarPostById, getCommentsByPost)

router.post('/', createPost)
router.post("/:id/comments",validarCommentById, createComment)

router.put('/:id', validarPostById, updatePost)

router.delete('/:id', validarPostById, deletePost)

module.exports = router;
