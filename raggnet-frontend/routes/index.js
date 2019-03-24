const auth = require('./auth');
const express = require('express');
const path = require('path');
const request = require('request');
const config = require('../app/models/config');
var router = express.Router();
var absPath = '/Users/Mthabisi/Desktop/raggnet/raggnet-frontend/';

// routes
router.get('/', (req, res) => {
  res.sendFile(absPath + 'index.html');
});

router.get('/books', (req, res, next) => {
  request.get(config.apiUrl + '/resources/books').pipe(res);
});

router.get('/moocs', (req, res, next) => {
  request.get(config.apiUrl + '/resources/courses').pipe(res);
});

router.get('/login', (req, res) => {
  res.sendFile(absPath + 'app/views/login.html');
});

router.post('/login', (req, res, next) => {
  request.post(config.apiUrl + '/auth/token', { form: req.body }).pipe(res);
});

// get user by id
router.get('/user', auth.loginRequired, (req, res, next) => {
  request.get(config.apiUrl + '/users/' + req.user.id + '?token=' + req.token).pipe(res);
});

module.exports = router;
