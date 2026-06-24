const {Router} = require('express')
const router = Router()
const validarPostById = require("../middlewares/post.middleware")
const {
    getPost,
    getPostById,
    createPost,
    updatePost,
    deletePost,
    addImageToPost,
    removeImageFromPost
} = require('../controllers/postController')

const { createComment,getCommentsByPost } = require('../controllers/commentController')
const validarCommentById = require('../middlewares/comment.middleware')
const validarPostImageById = require('../middlewares/postImage.middleware')

router.get('/', getPost)
router.get('/:id', validarPostById, getPostById)
router.get("/:id/comments", validarPostById, getCommentsByPost)
//router.get("/:id", validarPostById, getCommentsByPost)// CREO QUE ESTA DE MAS

router.post('/', createPost)
router.post("/:id/comments",validarCommentById, createComment)
router.post("/:id/images",validarPostById, addImageToPost)

router.put('/:id', validarPostById, updatePost)

router.delete('/:id', validarPostById, deletePost)
router.delete("/:id/images/:imageId",validarPostById,validarPostImageById,removeImageFromPost)

module.exports = router;
    