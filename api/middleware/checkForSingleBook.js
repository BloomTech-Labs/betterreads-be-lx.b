const Books = require('../models/booksModel');

function checkForSingleBook(req, res, next) {
  const { bookId } = req.params;

  Books.findById(bookId).then((book) => {
    if (book) {
      next();
    } else {
      res
        .status(404)
        .json({ message: 'Requested book does not exist in database' });
    }
  });
}

module.exports = checkForSingleBook;
