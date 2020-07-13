const express = require('express');
const authRequired = require('../middleware/authRequired');
const checkForUserBooks = require('../middleware/userBooksCheckFor');
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
        .json({ message: 'Server failed to retrieve user books', err });
    });
});

module.exports = router;
