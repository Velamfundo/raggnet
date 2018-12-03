const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ObjectId = mongoose.Schema.Types.ObjectId;
var resourceSchema = new Schema(
  {
    name: {type: String, required: true},
    authors: [{type: String, required: true}],
    url: {type: String, required: true},
    type: {type: String, required: true}, // book or course
    institution: String,
    platform: String,
    prerequisites: [String],
    tools: [String],
    price: Number, // check type
    isOffline: Boolean,
    comments: [ObjectId],
    otherResources: [ObjectId],
    size: Number,
    startDate: Date,
    endDate: Date,
  }
);

resourceSchema.pre('save', function(callback) {
  // ensure url starts with http://, https://, ftp://
  if (this.url && !(/^((https?)|(ftp)):\/\/.+/.test(this.url)))
    this.url = 'http://' + this.url;
  callback();
});

var Resource = mongoose.model('Resource', resourceSchema);

module.exports = Resource;
