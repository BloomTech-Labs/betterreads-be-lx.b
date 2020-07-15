const express = require('express');
const authRequired = require('../middleware/authRequired');
const checkForUserBooks = require('../middleware/userBooks/userBooksCheckFor');
const checkForSingleUserBook = require('../middleware/userBooks/checkForSingleUserBook');
const createUserBookReq = require('../middleware/userBooks/createUserBookReq');
const checkIfBookExists = require('../middleware/userBooks/checkIfBookExists');
const checkIfProfileExists = require('../middleware/userBooks/checkIfProfileExists');
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

router.post(
  '/',
  authRequired,
  createUserBookReq,
  checkIfBookExists,
  checkIfProfileExists,
  (req, res) => {
    const body = req.body;
    UserBooks.create(body)
      .then((userBook) => {
        res.status(201).json(userBook);
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .json({ error: 'Server failed to create user book', err });
      });
  }
);

router.delete('/:bookId', authRequired, checkForSingleUserBook, (req, res) => {
  UserBooks.remove(req.params.bookId).then(() =>
    res
      .status(204)
      .json({ message: 'Book was succesffully deleted!' })
      .catch((err) => {
        res
          .status(500)
          .json({ error: 'Server failed to delete user book', err });
      })
  );
});

router.put('/:bookId', authRequired, checkForSingleUserBook, (req, res) => {
  const body = req.body;
  UserBooks.update(req.params.bookId, body)
    .then((userBook) => {
      res.status(200).json(userBook);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Server failed to update user book', err });
    });
});

module.exports = router;
