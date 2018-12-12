const Comment = require('/models/schemas/comment');
// TODO: Define Resource

function writeComment(req, res, next) {
  var commentData = req.body;
  var newComment = new Comment(commentData);

  newComment.save()
  .then((err, comment) => {
    console.log(comment.content);
    return res.sendStatus(200);
  })
  .catch(err => {
    return next(err);
  });
}

// TODO: delete comment
function deleteComment(req, res, next) {
  Comment.findOneAndDelete({req.params.id})
}

function editComment(req, res, next) {
  Resource.findById(resource.ObjectId, (err, source) => {
    if (err) next(err);
    if (!source) return res.status(400).send('No resource with that ID.');
    source['comments'].push(req.body.comment);
    course.save((err) => {
      if (err) return next(err);
    });
    res.sendStatus(200);
  });
}

function getComments(req, res, next) {
  Resource.findById(req.params.id, (err, source) => {
    if (err) next(err);
    if (!source) return res.status(400).send('No resource with that ID.');
    return res.json(source['comments'])
  });
}
