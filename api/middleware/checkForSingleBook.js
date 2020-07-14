const Books = require('../models/booksModel');

function checkForSingleBook(req, res, next) {
  const { bookId } = req.params;

  Books.findById(bookId).then((book) => {
    if (book) {
      next();
    } else {
      res.status(404).json({ error: 'BookNotFound' });
    }
  });
}

module.exports = checkForSingleBook;
