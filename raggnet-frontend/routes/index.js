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

module.exports = router;
