const UserShelfBook = require('../models/userShelfBookModel');

const checkForUserShelfBook = async (req, res, next) => {
  try {
    const { bookshelfId, bookId } = req.params;
    if (!bookshelfId)
      return res
        .status(401)
        .json({ status: 'Failure', error: 'Enter a valid bookshelf Id' });
    if (!bookId)
      return res
        .status(400)
        .json({ status: 'Failure', error: 'Enter a valid book Id' });
    const userShelfBook = await UserShelfBook.findBookInBookshelf(
      bookshelfId,
      bookId
    );
    if (!userShelfBook)
      return res.status(400).json({
        status: 'Failure',
        error: 'Can not find a book with that id in this shelf',
      });
    next();
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
};

module.exports = checkForUserShelfBook;
