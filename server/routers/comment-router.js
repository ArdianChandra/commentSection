const router = require('express').Router()
const CommentController = require('../controllers/comment-controller')

router.get('/', CommentController.findAll)
router.post('/', CommentController.create)
router.put('/:commentId', CommentController.update)
router.delete('/:commentId', CommentController.delete)

module.exports = router