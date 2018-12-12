const User = require('../models/schemas/user');
const jwt = require('jwt-simple');
const config = require('../models/config');

function adminRequired(req, res, next) {
  validateToken(req, res, next, {adminRequired: true});
}

function superAdminRequired(req, res, next) {
  validateToken(req, res, next, {superAdminRequired: true});
}

function loginRequired(req, res, next) {
    validateToken(req, res, next, { loginRequired: true });
}

function loginUser(req, res, next) {
    if (typeof req.body.email !== 'string')
        return res.status(400).send('Missing email');
    if (typeof req.body.password !== 'string')
        return res.status(400).send('Missing password');

    User.findOne({ email: req.body.email }, function(err, user) {
        if (err) return next(err);
        if (!user) return res.status(400).send('No user with that email');

        user.comparePassword(req.body.password, function(err, isMatch) {
            if (err) return next(err);
            if (!isMatch) return res.status(401).send('Incorrect password');
            var payload = {
                id: user._id,
                email: user.email,
                username: user.username
            };
            var token = jwt.encode(payload, config.secret);
            user.token = token;
            user.isGuest = false;
            user.save(function(err) {
                if (err) return next(err);
                return res.json({token: token});
            });
        });
    });
}

// TODO: logout
function logoutUser(req, res, next) {
  User.findOne({email: req.body.email}, (err, user) => {
    if (err) return next(err);
    if (!user) return res.status(400).send('No user with that email');

    var payload = {isGuest: true};
    var token = jwt.encode(payload, config.secret);
    user.token = token;

    user.save(function(err) {
        if (err) return next(err);
        return res.status(200).send('Logged out successfully!');
    });
  });
}

function validateToken(req, res, next, c) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (!token) return res.status(403).send('This endpoint requires a token');
    try {
        var decoded = jwt.decode(token, config.secret);
    } catch(err) {
        return res.status(403).send('Failed to authenticate token');
    }

    User.findById(decoded.id, function(err, user) {
        if (err) return next(err);
        if (!user) return res.status(403).send('Invalid user');
        if (token !== user.token)
            return res.status(403).send('Expired token!');
        if (decoded.isGuest === true)
            return res.status(403).send('Expired token!');

        if (user.isGuest && c.loginRequired)
            return res.status(403).send('Login to gain more user privileges');

        if (!user.isAdmin && !user.isSuperAdmin && c.adminRequired)
            return res.status(403).send('Admin privileges required');

        if (!user.isSuperAdmin && c.superAdminRequired)
            return res.status(403).send('SuperAdmin privileges required');

        req.user = decoded;
        next();
    });
}

function verifyUser(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  //var admin = user.isAdmin || user.isSuperAdmin;
  User.findById(req.params.id, (err, user) => {
    if (err) return next(err);
    if (!user) return res.status(400).send('No user with that ID.');
    if (!user.token || (user.token !== token)) {
      return res.status(403).send('User verification error!')
    }

    next();
  });
}

module.exports = {
  loginRequired,
  adminRequired,
  superAdminRequired,
  loginUser,
  logoutUser,
  verifyUser,
}
