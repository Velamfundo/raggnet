const Resource = require('../models/schemas/resource');

function createResource(req, res, next) {
  var resourceData = {};
  for (property in req.body) {
    if (property !== 'approvedDate') {
      resourceData[property] = req.body[property];
    }
  }

  var newResource = new Resource(resourceData);
  newResource.save((err, resource) => {
    if (err) return next(err);

    resource.otherResources.forEach(other_id => {
      Resource.findById(other_id, (err, other) => {
        if (err) return next(err);
        if (!other) return res.status(400).send('Sorry, we couldn\'t find that resource');

        other.otherResources.push(newResource._id);
        other.save((err, other_resource) => {
          if (err) return next(err);
        });
      });
    });

    return res.sendStatus(200);
  });
};

function getCourses(req, res, next) {
  Resource.find({'type': 'course', approvedDate: {$exists: true}}, (err, courses) => {
    if (err) return next(err);
    return res.json(courses);
  });
}

function getBooks(req, res, next) {
  Resource.find({type: 'book', approvedDate: {$exists: true}}, (err, books) => {
    if (err) return next(err);
    return res.json(books);
  });
}

// return approved resources only
function getResources(req, res, next) {
  Resource.find({approvedDate: {$exists: true}}, (err, resources) => {
    if (err) return next(err);
    return res.json(resources);
  });
}

function getUnapprovedResources(req, res, next) {
  Resource.find({approvedDate: {$exists: false}}, (err, resources) => {
    if (err) return next(err);
    return res.json(resources);
  })
}

function getResourceById(req, res, next) {
  Resource.findById(req.params.id, (err, resource) => {
    if (err) next(err);
    if (!resource || !resource.approvedDate) return res.status(400).send('No resource with that ID.');
    return res.json(resource);
  });
}

function updateResource(req, res, next) {
  Resource.findById({'_id': req.params.id}, (err, resource) => {
    if (err) return next(err);
    if (!resource) return res.status(400).send('No resource with that ID.');

    for (property in req.body) {
      if ((property !== 'approvedDate') && (property !== 'otherResources')) {
        console.log(property);
        resource[property] = req.body[property];
      }
    }

    if (req.body.otherResources) {
      if(req.body.otherResources.length === 0) {
        resource.otherResources = undefined;
      } else if (typeof req.body.otherResources === 'string') {
        resource.otherResources.push(req.body.otherResources);
      } else {
        req.body.otherResources.forEach(other => {
          resource.otherResources.push(other)
        })
      }
    }

    if (resource.approvedDate) {
      resource.approvedDate = undefined;
    }

    resource.save((err, response) => {
      if (err) return next(err);
    });

    return res.sendStatus(200);
  });
}

function approveResource(req, res, next) {
  Resource.findOneAndUpdate({'_id': req.params.id, approvedDate: {$exists: false}}, {approvedDate: new Date()},
    {new: true}, (err, resource) => {
      if (err) return next(err);
      var message = 'Could not approve resource.\n';
      message += 'Why this might have happened:\n';
      message += '  [1] There is no resource with that ID\n';
      message += '  [2] This resource has already been approved.'

      if (!resource) return res.status(400).send(message);

      return res.status(200).send('Approved!!!');
    });
}

function removeElement(arr, item) {
  arr.splice(arr.indexOf(item), 1)
}

function deleteResource(req, res, next) {
  Resource.findOneAndDelete({'_id': req.params.id}, (err, resource) => {
    if (err) return next(err);
    if (!resource) return res.status(400).send('No resource with that ID.');

    resource.otherResources.forEach(other => {
      Resource.findById(other, (err, other_resource) => {
        if (err) return next(err);
        if (!other_resource) return res.status(400).send('No resource with that ID.');
        removeElement(other_resource.otherResources, req.params.id);
        other_resource.save((err, response) => {
          if (err) return next(err);
        });
      });
    });

    return res.sendStatus(200);
  });
}

// FIXME: check for loop and other_resources
function getOtherResources(req, res, next) {
  Resource.find({otherResources: req.params.id}, (err, others) => {
    var other_resources = [];

    others.forEach(other => {
      if (other.approvedDate) {
        other_resources.push(other);
      }
    });

    if (err) return next(err);
    return res.json(other_resources);
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
  getOtherResources,
  getUnapprovedResources,
  approveResource,
};
