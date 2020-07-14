const Books = require('../../models/booksModel');

function checkIfBookExists(req, res, next) {
  const { bookId } = req.body;

  Books.findById(bookId).then((book) => {
    if (book) {
      next();
    } else {
      res.status(404).json({ message: 'Must provide a valid bookId' });
    }
  });
}

module.exports = checkIfBookExists;
