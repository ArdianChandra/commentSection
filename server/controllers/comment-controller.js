const Comment = require('../models/comment-model')

class CommentController {
  static findAll (req, res, next) {
    Comment.find()
    .then(data => {
      if (data.length === 0) throw ({name: 'custom', status: 404, msg: 'No Data'})
      res.status(200).json(data)
    })
    .catch(err => {
      next(err)
    })
  }

  static create (req, res, next) {
    Comment.create(req.body)
    .then(data => {
      res.status(201).json(data.ops) //data hasil create ada di key "ops"
    })
    .catch(err => {
      next(err)
    })
  }

  static update (req, res, next) {
    let id = req.params.commentId
    let newComment = {
      id,
      comment: req.body
    }
    Comment.update(newComment)
    .then(() => {
      return Comment.findById(id)
    })
    .then(data => {
      res.status(201).json(data)
    })
    .catch(err => {
      next(err)
    })
  }

  static delete (req, res, next) {
    Comment.delete(req.params.commentId)
    .then(data => {
      if(data.deletedCount === 0) throw ({name: 'custom', status: 404, msg: 'Invalid ID'})
      res.status(200).json("Comment Successfully Deleted!")
    })
    .catch(err => {
      next(err)
    })
  }
}

module.exports = CommentController