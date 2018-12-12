const mongoose = require('mongoose');

var ObjectId = mongoose.Schema.Types.ObjectId;
var commentSchema = new Schema(
  {
    postedBy: ObjectId,
    tags: [String],
    replies: [ObjectId],
    content: String,
    votes: Number,
    resource: {type: ObjectId, required: true},
  }
);

commentSchema.pre('save', function(callback) {
  // check if comment has any content
  if (!this.content)
    return callback(new Error('Comment has no content'));
  callback();

  // TODO: check if resource is valid
})

var Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
