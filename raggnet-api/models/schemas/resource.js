const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ObjectId = mongoose.Schema.Types.ObjectId;
var resourceSchema = new Schema(
  {
    name: {type: String, required: true},
    author: {type: String, required: true},
    url: {type: String, required: true},
    type: {type: String, required: true}, // book or course
    institution: String,
    platform: String,
    prerequisites: [String],
    tools: [String],
    price: {type: Number, required: true}, // check type
    isOffline: Boolean,
    comments: [ObjectId],
    otherResources: [{type: ObjectId, ref: 'Resource'}],
    size: Number,
    startDate: Date,
    endDate: Date,
    approvedDate: Date,
    instShortName: {type: String, required: true},
    shortName: {type: String, required: true},
    tags: [{type: String, required: true}],
    featured: Boolean,
    views: {type: Number, required: true},
  }
);

resourceSchema.pre('save', function(callback) {
  // ensure url starts with http://, https://, ftp://
  if (this.url && !(/^((https?)|(ftp)):\/\/.+/.test(this.url))) {
    this.url = 'http://' + this.url;
  }
  this.instShortName = this.instShortName.toLowerCase();
  callback();
});

var Resource = mongoose.model('Resource', resourceSchema);

module.exports = Resource;
