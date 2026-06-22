const {Router} = require('express')
const router = Router()
const validarTagById = require("../middlewares/tag.middleware")
const {createTag,findAll,findById,editTag,deleteTag} = require("../controllers/tagController")

router.get("/", findAll)
router.get("/:id",validarTagById, findById)
router.post("/", createTag)
router.put("/:id",validarTagById,editTag)
router.delete("/:id", validarTagById, deleteTag)

module.exports = router