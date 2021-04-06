const router = require('express').Router()
const commentRouter = require('./comment-router')
const replyRouter = require('./reply-router')

router.use('/comments', commentRouter)
router.use('/replies', replyRouter)

module.exports = router