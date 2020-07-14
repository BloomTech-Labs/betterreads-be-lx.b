const express = require('express');
const authRequired = require('../middleware/authRequired');
const checkForUserBooks = require('../middleware/userBooks/userBooksCheckFor');
const checkForSingleUserBook = require('../middleware/userBooks/checkForSingleUserBook');
const UserBooks = require('../models/userBooksModel');
const router = express.Router();

router.get('/', checkForUserBooks, (req, res) => {
  UserBooks.findAll()
    .then((userBooks) => {
      res.status(200).json(userBooks);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: 'Server failed to retrieve user books', err });
    });
});

router.get('/:bookId', checkForSingleUserBook, (req, res) => {
  const { bookId } = req.params;
  UserBooks.findById(bookId)
    .then((userBook) => {
      res.status(200).json(userBook);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: 'Server failed to retrieve user book', err });
    });
});
module.exports = router;
