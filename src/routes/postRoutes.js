const {Router} = require('express')
const router = Router()

const {
    getPost,
    getPostById,
    createPost,
    updatePost,
    deletePost
} = require('../controllers/postController')
const { createComment,getCommentsByPost } = require('../controllers/commentController')

router.get('/', getPost)
router.get('/:id', getPostById)
router.get("/:id",getCommentsByPost)

router.post('/', createPost)
router.post("/:id/comments", createComment)

router.put('/:id', updatePost)

router.delete('/:id', deletePost)

module.exports = router;
