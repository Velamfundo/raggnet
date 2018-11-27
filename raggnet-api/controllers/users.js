const User = require('../models/schemas/user');

function createUser(req, res, next) {
  var userData = req.body;
  userData.hash = req.body.password;

  var newUser = new User(userData);
  newUser.save((err, user) => {
    console.log(err);
    if (err) {
      if (err.code === 11000)
        return res.status(400).send('Another user has this email');
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
  User.findOneAndUpdate({'_id': req.params.id}, req.body, (err, user) => {
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

// review will be added to update funcs of books and courses

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
