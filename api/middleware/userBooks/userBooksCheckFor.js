const UserBooks = require('../../models/userBooksModel');

function checkForUserBooks(req, res, next) {
  UserBooks.findAll().then((userBooks) => {
    if (userBooks.length != 0) {
      next();
    } else {
      res.status(404).json({ message: 'No user books were found' });
    }
  });
}

module.exports = checkForUserBooks;
