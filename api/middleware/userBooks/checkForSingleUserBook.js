const UserBooks = require('../../models/userBooksModel');

function checkForSingleUserBook(req, res, next) {
  const { bookId } = req.params;

  UserBooks.findById(bookId).then((book) => {
    if (book) {
      next();
    } else {
      res.status(404).json({ message: 'UserBookNotFound' });
    }
  });
}

module.exports = checkForSingleUserBook;
