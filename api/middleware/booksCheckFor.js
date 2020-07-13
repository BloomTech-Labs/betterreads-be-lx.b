const Books = require('../models/booksModel');

function checkForBooks(req, res, next) {
  Books.findAll().then((books) => {
    if (books.length != 0) {
      next();
    } else {
      res.status(404).json({ message: 'No books were found' });
    }
  });
}

module.exports = checkForBooks;
