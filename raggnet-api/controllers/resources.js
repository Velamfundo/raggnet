const Resource = require('../models/schemas/resource');

function createResource(req, res, next) {
  var resourceData = req.body;

  var newResource = new Resource(resourceData);
  newResource.save((err, resource) => {
    if (err) return next(err);
    return res.sendStatus(200);
  });
};

function getCourses(req, res, next) {
  Resource.find({'type': 'course'}, (err, courses) => {
    if (err) return next(err);
    return res.json(courses);
  });
}

function getBooks(req, res, next) {
  Resource.find({'type': 'book'}, (err, books) => {
    if (err) return next(err);
    return res.json(books);
  });
}

function getResources(req, res, next) {
  Resource.find({}, (err, resources) => {
    if (err) return next(err);
    return res.json(resources);
  });
}

function getResourceById(req, res, next) {
  Resource.findById(req.params.id, (err, resource) => {
    if (err) next(err);
    if (!resource) return res.status(400).send('No resource with that ID.');
    return res.json(resource);
  });
}

function updateResource(req, res, next) {
  Resource.findOneAndUpdate({'_id': req.params.id}, req.body, (err, resource) => {
    if (err) return next(err);
    if (!resource) return res.status(400).send('No resource with that ID.');
    return res.sendStatus(200);
  });
}

function deleteResource(req, res, next) {
  Resource.findOneAndDelete({'_id': req.params.id}, (err, resource) => {
    if (err) return next(err);
    if (!resource) return res.status(400).send('No resource with that ID.');
    return res.sendStatus(200);
  });
}

// TODO: Add comments functions in v. 1.1.0

// TODO: download function

module.exports = {
  createResource,
  getResources,
  getResourceById,
  updateResource,
  deleteResource,
  getBooks,
  getCourses,
};
