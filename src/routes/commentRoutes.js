const {Router} = require('express')
const router = Router()
const {getAllComments,getCommentById,createComment,updateComment,deleteComment} = require("../controllers/commentController")
const validarCommentById = require("../middlewares/comment.middleware")

router.get("/",getAllComments)
router.get("/:id", validarCommentById, getCommentById)

router.post("/",createComment)

router.put("/:id", validarCommentById, updateComment)

router.delete("/:id", validarCommentById, deleteComment)

module.exports = router