const router = require('express').Router()
const ReplyController = require('../controllers/reply-controller')

router.get('/', ReplyController.findAll)
router.post('/:commentId', ReplyController.create)
router.put('/:commentId/:replyId', ReplyController.update)
router.delete('/:commentId/:replyId', ReplyController.delete)

module.exports = router