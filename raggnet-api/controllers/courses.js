const Course = require('../models/schemas/course');

function createCourse(req, res, next) {
  var courseData = req.body;

  var newCourse = new Course(courseData);
  newCourse.save((err, course) => {
    if (err) return next(err);
    return res.sendStatus(200);
  });
};

function getCourses(req, res, next) {
  Course.find({}, (err, courses) => {
    if (err) return next(err);
    return res.json(courses);
  });
}

function getCourseById(req, res, next) {
  Course.findById(req.params.id, (err, course) => {
    console.log(err);
    if (err) next(err);
    if (!course) return res.status(400).send('No course with that ID.');
    return res.json(course);
  });
}

function updateCourse(req, res, next) {
  Course.findOneAndUpdate({'_id': req.params.id}, req.body, (err, course) => {
    if (err) return next(err);
    if (!course) return res.status(400).send('No course with that ID.');
    return res.sendStatus(200);
  });
}

function deleteCourse(req, res, next) {
  Course.findOneAndDelete({'_id': req.params.id}, (err, course) => {
    if (err) return next(err);
    if (!course) return res.status(400).send('No course with that ID.');
    return res.sendStatus(200);
  });
}

function updateReviews(req, res, next) {
  Course.findById(req.params.id, (err, course) => {
    if (err) next(err);
    if (!course) return res.status(400).send('No course with that ID.');
    course['reviews'].push(req.body.review);
    course.save((err) => {
      if (err) return next(err);
    });
    res.sendStatus(200);
  });
}

function getReviews(req, res, next) {
  Course.findById(req.params.id, (err, course) => {
    if (err) next(err);
    if (!book) return res.status(400).send('No course with that ID.');
    return res.json(course['reviews'])
  });
}

// TODO: download function

module.exports = {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  getReviews,
  updateReviews,
};
