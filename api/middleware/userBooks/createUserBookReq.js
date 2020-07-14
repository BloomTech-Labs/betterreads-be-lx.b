function createUserBookReq(req, res, next) {
  const { bookId } = req.body;

  if (bookId) {
    next();
  } else {
    res.status(400).json({ message: 'Must include a book id!' });
  }
}

module.exports = createUserBookReq;
