const { ObjectId } = require('bson')
const {getDatabase} = require('../config/mongodb')

class Replies {
  static find () {
    return getDatabase().collection('replies').find().toArray()
  }

  static findById (id) {
    return getDatabase().collection('replies').find(
      { _id: ObjectId(id)}
    ).toArray()
  }

  static create (newReplies) {
    return getDatabase().collection('replies').insertOne(newReplies)
  }

  static update (updateReplies) {
    return getDatabase().collection('replies').updateOne(
      { _id: ObjectId(updateReplies.replyId)},
      { $set: updateReplies.reply} //replies in object {}
    )
  }

  static delete (id) {
    return getDatabase().collection('replies').deleteOne(
      { _id: ObjectId(id)}
    )
  }
}

module.exports = Replies