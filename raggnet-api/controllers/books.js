// TODO: JS prototypical inheritance
// Resource schema

const Book = require('../models/schemas/book');

function createBook(req, res, next) {
  var bookData = req.body;

  var newBook = new Book(bookData);
  newBook.save((err, book) => {
    if (err) return next(err);
    return res.sendStatus(200);
  });
};

function getBooks(req, res, next) {
  Book.find({}, (err, books) => {
    if (err) return next(err);
    return res.json(books);
  });
}

function getBookById(req, res, next) {
  Book.findById(req.params.id, (err, book) => {
    if (err) next(err);
    if (!book) return res.status(400).send('No book with that ID.');
    return res.json(book);
  });
}

function updateBook(req, res, next) {
  Book.findOneAndUpdate({'_id': req.params.id}, req.body, (err, book) => {
    if (err) return next(err);
    if (!book) return res.status(400).send('No book with that ID.');
    return res.sendStatus(200);
  });
}

function deleteBook(req, res, next) {
  Book.findOneAndDelete({'_id': req.params.id}, (err, book) => {
    if (err) return next(err);
    if (!book) return res.status(400).send('No book with that ID.');
    return res.sendStatus(200);
  });
}

function getBook(req, res, next) {
  Book.findById(req.params.id, (err, book) => {
    if (err) next(err);
    if (!book) return res.status(400).send('No book with that ID.');
    return book
  });
}

function updateReviews(req, res, next) {
  Book.findById(req.params.id, (err, book) => {
    if (err) next(err);
    if (!book) return res.status(400).send('No book with that ID.');
    book['reviews'].push(req.body.review);
    book.save((err) => {
      if (err) return next(err);
    });
    res.sendStatus(200);
  });
}

function getReviews(req, res, next) {
  Book.findById(req.params.id, (err, book) => {
    if (err) next(err);
    if (!book) return res.status(400).send('No book with that ID.');
    return res.json(book['reviews'])
  });
}

// TODO: download function

module.exports = {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
  getReviews,
  updateReviews,
};
