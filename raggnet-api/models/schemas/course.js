const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ObjectId = mongoose.Schema.Types.ObjectId;
var courseSchema = new Schema(
  {
    name: {type: String, required: true},
    author: [{type: String, required: true}],
    url: {type: String, required: true},
    timeline: String,
    institution: String,
    platform: String,
    prerequisites: [String],
    tools: [String],
    price: Number,
    isOffline: Boolean,
    reviews: [String],
    books: [ObjectId],
    size: Number,
    //startDate: Date,
    //endDate: Date,
  }
);

courseSchema.pre('save', function(callback) {
  // ensure url starts with http://, https://, ftp://
  if (this.url && !(/^((https?)|(ftp)):\/\/.+/.test(this.url)))
    this.url = 'http://' + this.url;
  callback();
});

var Course = mongoose.model('Course', courseSchema);

module.exports = Course;
