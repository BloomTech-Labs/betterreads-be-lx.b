const express = require('express');
const authRequired = require('../middleware/authRequired');
const checkForBooks = require('../middleware/booksCheckFor');
const checkForSingleBook = require('../middleware/checkForSingleBook');
const createBookRequirements = require('../middleware/createBookRequirements');
const Books = require('../models/booksModel');
const router = express.Router();

router.get('/', checkForBooks, (req, res) => {
  Books.findAll()
    .then((books) => {
      res.status(200).json(books);
    })
    .catch((err) => {
      res.status(500).json({ message: 'Unable to retrieve books', err });
    });
});

router.get('/:bookId', checkForSingleBook, (req, res) => {
  const { bookId } = req.params;
  Books.findById(bookId)
    .then((book) => {
      res.status(200).json(book);
    })
    .catch((err) => {
      res.status(500).json({ message: 'Unable to retrieve request book', err });
    });
});

router.post('/', authRequired, createBookRequirements, (req, res) => {
  var book = req.body;
  Books.create(book)
    .then((book) => {
      res
        .status(201)
        .json({ message: 'Book successfully added our database', book });
    })
    .catch((err) => {
      res.status(500).json({ message: 'Server unable to add book', err });
    });
});

router.delete('/:bookId', authRequired, checkForSingleBook, (req, res) => {
  Books.remove(req.params.bookId)
    .then((book) => res.status(204).json(book))
    .catch((err) => {
      res.status(500).json({ message: 'Server failed to delete book', err });
    });
});

router.put('/:bookId', authRequired, checkForSingleBook, (req, res) => {
  const body = req.body;
  Books.update(req.params.bookId, body)
    .then((book) => {
      res.status(200).json(book);
    })
    .catch((err) => {
      res.status(500).json({ message: 'Server failed to update book', err });
    });
});

module.exports = router;
