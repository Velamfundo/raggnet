const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./models/config');

const auth = require('./controllers/auth');
const users = require('./controllers/users');
const courses = require('./controllers/courses');
const books = require('./controllers/books');

mongoose.connect(config.dbUrl);

var app = express();
var router = express.Router();

// log if in dev mode
if (app.get('env') !== 'production')
  app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//==============================================
// Middleware
//==============================================

router.param('id', (req, res, next, id) => {
  if (!id.match(/^[0-9a-fA-F]{24}$/))
    return res.status(400).send('Invalid ID');
  next();
});

router.param('phone', (req, res, next, phone) => {
    if (!(+phone) || phone.length !== 10)
        return res.status(400).send('Invalid phone');
    next();
});

router.param('email', (req, res, next) => {
  if (!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(req.body.email)))
    return res.status(400).send('Invalid email');
  next();
});

router.param('url', (req, res, next) => {
  if (!(/^((https?)|(ftp)):\/\/.+/.test(this.url)))
    this.url = 'http://' + this.url;
  next();
});

//==============================================
// Routes
//==============================================

app.use('/', router);
router.route('/users')
  .get(users.getUsers)
  .post(users.createUser);
router.route('/users/:id')
  .get(users.getUserById)
  .put(users.updateUser)
  .delete(users.deleteUser);
router.route('/courses')
  .get(courses.getCourses)
  .post(courses.createCourse);
router.route('/courses/:id')
  .get(courses.getCourseById)
  .put(courses.updateCourse)
  .delete(courses.deleteCourse);
router.route('/courses/:id/reviews')
  .get(courses.getReviews)
  .put(courses.updateReviews);
router.route('/books')
  .get(books.getBooks)
  .post(books.createBook);
router.route('/books/:id')
  .get(books.getBookById)
  .put(books.updateBook)
  .delete(books.deleteBook);
router.route('/books/:id/reviews')
  .get(books.getReviews)
  .put(books.updateReviews);

// handle 404
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  if (app.get('env') === 'dev')
    console.log(err);
  res.status(err.status || 500).send();
});

var server = app.listen(config.port);
console.log('Listening at http://localhost:%s in %s mode',
  server.address().port, app.get('env'));

module.exports = app;
