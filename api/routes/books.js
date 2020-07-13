const express = require('express');
const authRequired = require('../middleware/authRequired');
const checkForBooks = require('../middleware/booksCheckFor');
const checkForSingleBook = require('../middleware/checkForSingleBook');
const createBookRequirements = require('../middleware/createBookRequirements');
const Books = require('../models/booksModel');
const router = express.Router();

router.get('/', checkForBooks, function (req, res) {
  Books.findAll()
    .then((books) => {
      res.status(200).json(books);
    })
    .catch((err) => {
      res.status(500).json({ message: 'Unable to retrieve books', error: err });
    });
});

router.get('/:bookId', checkForSingleBook, function (req, res) {
  Books.findById()
    .then((book) => {
      res.status(200).json(book);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: 'Unable to retrieve request book', error: err });
    });
});

router.post('/', authRequired, createBookRequirements, function (req, res) {
  var book = req.body;
  Books.create(book)
    .then((book) => {
      res
        .status(201)
        .json({ message: 'Book successfully added our database', book: book });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: 'Server unable to add book', error: err });
    });
});

router.delete('/:bookId', authRequired, checkForSingleBook, function (
  req,
  res
) {
  Books.remove(req.params.bookId)
    .then((book) => res.status(204).json(book))
    .catch((err) => {
      res
        .status(500)
        .json({ message: 'Server failed to delete book', error: err });
    });
});

router.put('/:bookId', authRequired, checkForSingleBook, function (req, res) {
  const body = req.body;
  Books.update(req.params.bookId, body)
    .then((book) => {
      res.status(200).json(book);
    })
    .catch((err) => {
      res.status(500).json({ message: 'Server failed to update book' });
    });
});

module.exports = router;
