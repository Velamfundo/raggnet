const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema(
  {
    firstName: {type: String},
    lastName: {type: String},
    email: {type: String},
    phoneNumber: {type: String},
    username: {type: String},
    location: {
      name: {type: String},
      coordinates: {type: [Number]}
    },
    hash: {type: String},
    companyName: {type: String},
    heading: {type: String},
    isGuest: {type: Boolean},
    interests: [String],
    skills: [String],
    imageUrl: String,
    token: String,
  }
);

// if not guest require firstName, lastName, email, hash,
userSchema.pre('save', function(callback) {
  if (!this.isGuest) {
    if (!this.firstName || !this.lastName)
      return callback(new Error('Missing fullname'));
    if (!this.email)
      return callback(new Error('Missing email'));
    if (!this.hash)
      return callback(new Error('Missing password'));
    if (this.isModified('hash'))
      this.hash = bcrypt.hashSync(this.hash);
  }
  callback();
});

// create full name
userSchema.virtual('name').get(function() {
    var name = "";
    if (this.firstName) {
        name = this.firstName;
        if (this.lastName) name += ' ' + this.lastName;
    } else if (this.lastName) name = this.lastName;
    return name;
});

// methods for validating password
userSchema.methods.comparePassword = function(pw, callback) {
	bcrypt.compare(pw, this.hash, (err, isMatch) => {
		if (err) return callback(err);
		callback(null, isMatch);
	});
};

var User = mongoose.model('User', userSchema);

module.exports = User;
