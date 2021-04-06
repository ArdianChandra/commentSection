const Reply = require('../models/reply-model')

class ReplyController {
  static findAll (req, res, next) {
    Reply.find()
    .then(data => {
      if (data.length === 0) throw ({name: 'custom', status: 404, msg: 'No Data'})
      res.status(200).json(data)
    })
    .catch(err => {
      next(err)
    })
  }

  static create (req, res, next) {
    let commentId = req.params.commentId
    let newReply = {
      commentId,
      name: req.body.name,
      reply: req.body.reply
    }
    Reply.create(newReply)
    .then(data => {
      res.status(201).json(data.ops) //data hasil create ada di key "ops"
    })
    .catch(err => {
      next(err)
    })
  }

  static update (req, res, next) {
    let commentId = req.params.commentId
    let replyId = req.params.replyId
    let newReply = {
      replyId,
      reply: {
          reply: req.body.reply,
          commentId
        }
    }
    Reply.update(newReply)
    .then(() => {
      return Reply.findById(replyId)
    })
    .then(data => {
      res.status(201).json(data)
    })
    .catch(err => {
      next(err)
    })
  }

  static delete (req, res, next) {
    Reply.delete(req.params.replyId)
    .then(data => {
      if(data.deletedCount === 0) throw ({name: 'custom', status: 404, msg: 'Invalid ID'})
      res.status(200).json("Reply Successfully Deleted!")
    })
    .catch(err => {
      next(err)
    })
  }
}

module.exports = ReplyController