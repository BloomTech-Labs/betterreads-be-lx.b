function createUserBookReq(req, res, next) {
  const { bookId, profileId } = req.body;

  if (bookId && profileId) {
    next();
  } else if (bookId) {
    res.status(400).json({ message: 'Must include profileId!' });
  } else if (profileId) {
    res.status(400).json({ message: 'Must include bookId!' });
  } else {
    res.status(400).json({ message: 'Must include a bookId and profileID!' });
  }
}

module.exports = createUserBookReq;
