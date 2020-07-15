const express = require('express');
const authRequired = require('../middleware/authRequired');
const checkForUser = require('../middleware/checkForUser');
const checkForBookshelf = require('../middleware/checkForBookshelf');
const createBookshelfRequirements = require('../middleware/createBookshelfRequirements');
const BookShelf = require('../models/bookshelfModel');
const UserShelfBook = require('../models/userShelfBookModel');
const router = express.Router();

router.use(authRequired);

/**
 * @swagger
 * components:
 *  schemas:
 *    Bookshelf:
 *      type: object
 *      required:
 *        - name
 *        - userId
 *      properties:
 *        userId:
 *          type: sring
 *          description: Id of the user creating bookshelf
 *        name:
 *          type: string
 *        private:
 *          type: boolean
 *      example:
 *        id: 1
 *        name: 'Fiction Favorites'
 *        private: false
 *        userId: '00uhjfrwdWAQvD8JV4x6'
 */

/**
 * @swagger
 * /bookshelves/user/{userId}:
 *  get:
 *    description: Get all bookshelves of a user
 *    summary: Gets all bookshelves of a user with all the books in each bookshelf
 *    security:
 *      - okta: []
 *    tags:
 *      - bookshelf
 *    parameters:
 *      - in: path
 *        name: userId
 *        type: string
 *        required: true
 *    responses:
 *      200:
 *        description: Returns all bookshelves of a user with all the books in each bookshelf
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Bookshelf'
 *              example:
 *                - id: 1
 *                  name: 'Fiction Favorites'
 *                  private: false
 *                  profileId: "00uhjfrwdWAQvD8JV4x6"
 *                  books: [{shelfId: 1, bookId: 1, readingStatus: Reading, thumbnail: 'imagelink.fakeurl'}]
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      400:
 *        description: Bad Request - User with that id does not exist
 */
// GET ALL BOOKSHELFS OF A USER
router.get('/user/:userId', [checkForUser], getAllBookShelfsOfAUser);

/**
 * @swagger
 * /bookshelves:
 *  post:
 *    description: Creates a bookshelf for a user
 *    summary: Creates a bookshelf
 *    security:
 *      - okta: []
 *    tags:
 *      - bookshelf
 *    requestBody:
 *      description: Bookshelf object
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#components/schemas/Bookshelf'
 *    responses:
 *      201:
 *        description: Returns newly created bookshelf
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              item:
 *                $ref: '#/components/schemas/Bookshelf'
 *              example:
 *                id: 1
 *                name: 'Fiction Favorites'
 *                private: false
 *                profileId: "00uhjfrwdWAQvD8JV4x6"
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      400:
 *        description: Bad Request - User with that id does not exist
 */
// POST A NEW BOOKSHELF
router.post('/', [createBookshelfRequirements], createABookShelf);


/**
 * @swagger
 * /bookshelves/{bookshelfId}:
 *  get:
 *    description: Creates a bookshelf for a user
 *    summary: Creates a bookshelf
 *    security:
 *      - okta: []
 *    tags:
 *      - bookshelf
 *    parameters:
 *      - in: path
 *        name: bookshelfId
 *        type: number
 *        required: true
 *    responses:
 *      200:
 *        description: Returns bookshelf with array of books
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              item:
 *                $ref: '#/components/schemas/Bookshelf'
 *              example:
 *                id: 1
 *                name: 'Fiction Favorites'
 *                private: false
 *                profileId: "00uhjfrwdWAQvD8JV4x6"
 *                books: [{shelfId: 1, bookId: 1, readingStatus: Reading, thumbnail: 'imagelink.fakeurl'}]
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      400:
 *        description: Bad Request - Bookshelf with that id does not exist
 */
// GET A BOOKSHELF BY ID
router.get('/:bookshelfId', [checkForBookshelf], getABookShelf);

/**
 * @swagger
 * /bookshelves/{bookshelfId}:
 *  put:
 *    description: Edit a bookshelf
 *    summary: Edit a bookshelf
 *    security:
 *      - okta: []
 *    tags:
 *      - bookshelf
 *    parameters:
 *      - in: path
 *        name: bookshelfId
 *        type: number
 *        required: true
 *    requestBody:
 *      description: Bookshelf object
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#components/schemas/Bookshelf'
 *    responses:
 *      200:
 *        description: Returns success message
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              item:
 *                $ref: '#/components/schemas/Bookshelf'
 *              example:
 *                id: 1
 *                name: 'Fiction Favorites'
 *                private: false
 *                userId: '00uhjfrwdWAQvD8JV4x6'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      400:
 *        description: Bad Request - Bookshelf with that id does not exist / User already has a bookshelf with same name
 */

// EDIT A BOOKSHELF
router.put(
  '/:bookshelfId',
  [checkForBookshelf, createBookshelfRequirements],
  editBookShelf
);

/**
 * @swagger
 * /bookshelves/{bookshelfId}:
 *  delete:
 *    description: Delete a bookshelf
 *    summary: Delete a bookshelf
 *    security:
 *      - okta: []
 *    tags:
 *      - bookshelf
 *    parameters:
 *      - in: path
 *        name: bookshelfId
 *        type: number
 *        required: true
 *    responses:
 *      200:
 *        description: Returns success message
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              item:
 *                $ref: '#/components/schemas/Bookshelf'
 *              example:
 *                message: "Deleted"
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      400:
 *        description: Bad Request - Bookshelf with that id does not exist
 */
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
