const { ObjectId } = require('bson')
const {getDatabase} = require('../config/mongodb')

class Comment {
  static find () {
    return getDatabase().collection('comments').find().toArray()
  }

  static findById (id) {
    return getDatabase().collection('comments').find(
      { _id: ObjectId(id)}
    ).toArray()
  }

  static create (newComment) {
    return getDatabase().collection('comments').insertOne(newComment)
  }

  static update (updateComment) {
    return getDatabase().collection('comments').updateOne(
      { _id: ObjectId(updateComment.id)},
      { $set: updateComment.comment} //comment in object {}
    )
  }

  static delete (id) {
    return getDatabase().collection('comments').deleteOne(
      { _id: ObjectId(id)}
    )
  }
}

module.exports = Comment