const express = require('express');
const authRequired = require('../middleware/authRequired');
const checkForUser = require('../middleware/checkForUser');
const checkForBookshelf = require('../middleware/checkForBookshelf');
const createBookshelfRequirements = require('../middleware/createBookshelfRequirements');
const BookShelf = require('../models/bookshelfModel');
const UserShelfBook = require('../models/userShelfBookModel');
const router = express.Router();

router.use(authRequired);

// GET ALL BOOKSHELFS OF A USER
router.get('/user/:userId', [checkForUser], getAllBookShelfsOfAUser);

// POST A NEW BOOKSHELF
router.post('/', [createBookshelfRequirements], createABookShelf);

// GET A BOOKSHELF BY ID
router.get('/:bookshelfId', [checkForBookshelf], getABookShelf);

// EDIT A BOOKSHELF
router.put(
  '/:bookshelfId',
  [checkForBookshelf, createBookshelfRequirements],
  editBookShelf
);

// DELETE A BOOKSHELF
router.delete('/:bookshelfId', [checkForBookshelf], deleteBookshelf);

// METHODS
async function createABookShelf(req, res) {
  try {
    const bookshelf = {
      name: req.body.name,
      private: req.body.private || false,
      profileId: req.body.userId,
    };
    const newBookShelf = await BookShelf.insert(bookshelf);
    return res.status(201).json({ status: 'Success', bookshelf: newBookShelf });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 'Failure', error: 'Server Error' });
  }
}

async function getAllBookShelfsOfAUser(req, res) {
  try {
    const bookshelfsHash = {};
    const bookshelfs = await BookShelf.findAllBookshelfsByUserId(req.user.id);
    const bookshelfsPromises = bookshelfs.map((bookshelf) =>
      UserShelfBook.findBooksByShelfId(bookshelf.id)
    );
    const booksResponse = await Promise.all(bookshelfsPromises);
    booksResponse.forEach((x) => {
      if (x.length) {
        bookshelfsHash[x[0].shelfId] = x;
      }
    });
    bookshelfs.forEach((x) => (x.books = bookshelfsHash[x.id] || []));
    return res.status(200).json({ status: 'Success', bookshelfs });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Server Error' });
  }
}

async function getABookShelf(req, res) {
  try {
    req.bookshelf.books = await UserShelfBook.findBooksByShelfId(
      req.bookshelf.id
    );
    return res
      .status(200)
      .json({ status: 'Success', bookshelf: req.bookshelf });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 'Failure', error: 'Server Error' });
  }
}

async function editBookShelf(req, res) {
  try {
    req.bookshelf.name = req.body.name || req.bookshelf.name;
    req.bookshelf.private =
      req.body.private !== null ? req.body.private : req.bookshelf.private;
    const edited = await BookShelf.update(req.bookshelf);
    return res.status(200).json({ status: 'Successful', bookshelf: edited });
  } catch (error) {
    return res.status(500).json({ status: 'Failure', error: 'Server Error' });
  }
}

async function deleteBookshelf(req, res) {
  try {
    await BookShelf.remove(req.bookshelf.id);
    return res.status(200).json({ status: 'Success', message: 'Deleted' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 'failure', error: 'Server Error' });
  }
}

module.exports = router;
