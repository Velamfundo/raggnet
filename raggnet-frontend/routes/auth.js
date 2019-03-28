const jwt = require('jwt-simple');
const config = require('../app/models/config');

function adminRequired(req, res, next) {
  validateToken(req, res, next, {adminRequired: true});
}

function superAdminRequired(req, res, next) {
  validateToken(req, res, next, {superAdminRequired: true});
}

function loginRequired(req, res, next) {
  validateToken(req, res, next, {loginRequired: true});
}

function validateToken(req, res, next, c) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (!token) return res.redirect(403, '/logout');

  try {
    var decoded = jwt.decode(token, config.secret);
  } catch (err) {
    return res.redirect(403, '/logout');
  }

  if (c.adminRequired && !decoded.isAdmin && !decoded.isSuperAdmin) {
    return res.redirect(403, '/logout'); //redirect to proper route
  }
  if (c.superAdminRequired && !decoded.isSuperAdmin) {
    return res.redirect(403, '/logout'); //redirect to proper route
  }

  if (!decoded.id) return res.redirect(403, '/logout');
  req.user = decoded;
  req.token = token;
  next();
}

module.exports = {
  adminRequired,
  superAdminRequired,
  loginRequired
};
