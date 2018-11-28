const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ObjectId = mongoose.Schema.Types.ObjectId;
var bookSchema = new Schema(
  {
    name: {type: String, required: true},
    authors: [{type: String, required: true}],
    url: {type: String, required: true},
    prerequisites: [String],
    tools: [String],
    price: Number,
    isOffline: Boolean,
    reviews: [String],
    courses: [ObjectId],
    size: Number,
  }
);

bookSchema.pre('save', function(callback) {
  // ensure url starts with http://, https://, ftp://
  if (this.url && !(/^((https?)|(ftp)):\/\/.+/.test(this.url)))
    this.url = 'http://' + this.url;
  callback();
});

var Book = mongoose.model('Book', bookSchema);

module.exports = Book;
