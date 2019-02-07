const User = require('../models/schemas/user');
const Resource = require('../models/schemas/resource');

function createUser(req, res, next) {
  var userData = req.body;
  userData.hash = req.body.password;

  var newUser = new User(userData);
  newUser.save((err, user) => {
    console.log(err);
    if (err) {
      if (err.code === 11000)
        return res.status(400).send('Another user has this email or username');
      return next(err);
    }
    return res.sendStatus(200);
  });
};

function getUsers(req, res, next) {
  User.find({}, (err, users) => {
    if (err) return next(err);
    return res.json(users);
  });
}

function getUserById(req, res, next) {
  User.findById(req.params.id, (err, user) => {
    if (err) next(err);
    if (!user) return res.status(400).send('No user with that ID.');
    return res.json(user);
  });
}

function updateUser(req, res, next) {
  var data = {};

  for (property in req.body) {
    if (property !== 'interests' && property !== 'skills') {
      data[property] = req.body[property];
    } else {
      data[property] = [];
      if (typeof req.body[property] === 'string') {
        data[property].push(req.body[property]);
      } else {
        req.body[property].forEach(item => {
          data[property].push(item)
        })
      }
    }
  }

  User.findOneAndUpdate({'_id': req.params.id}, {$push: data}, (err, user) => {

    if (err) return next(err);
    // if (!user) return res.status(400).send('No user with that ID.');
    return res.sendStatus(200);
  });
}

function deleteUser(req, res, next) {
  User.findOneAndDelete({'_id': req.params.id}, (err, user) => {
    if (err) return next(err);
    // if (!user) return res.status(400).send('No user with that ID.');
    return res.sendStatus(200);
  });
}

function handPickResources(req, res, next) {
  User.findById(req.params.id, {interests: 1, '_id': 0}, (err, user) => {
    if (err) return next(err);
    Resource.find({$or: [
      {skills: {$in: user.interests}},
      {prerequisites: {$in: user.interests}},
      {category: {$in: user.interests}}
    ]}, (err, picked) => {
      if (err) return next(err);
      return res.json(picked);
    });
  });
}

// review will be added to update funcs of books and courses

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  handPickResources,
};
