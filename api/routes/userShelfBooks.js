const express = require('express');
const UserShelfBook = require('../models/userShelfBookModel');
const checkForBookshelf = require('../middleware/checkForBookshelf');
const checkForUserShelfBook = require('../middleware/checkForUserShelfBook');
const createUserShelfBookRequirements = require('../middleware/createUserShelfBookRequirements');
const authRequired = require('../middleware/authRequired');
const router = express.Router();

router.use(authRequired);

/**
 * @swagger
 * components:
 *  schemas:
 *    UserShelfBook:
 *      type: object
 *      required:
 *        - shelfId
 *        - bookId
 *      properties:
 *        shelfId:
 *          type: number
 *          description: Id of the bookshelf
 *        bookId:
 *          type: number
 *          description: Id of user book
 *      example:
 *        shelfId: 1
 *        bookId: 1
 */

/**
 * @swagger
 * /api/user-shelf-book/{bookshelfId}/books:
 *  get:
 *    description: Get all the books of a bookshelf
 *    summary: Get all the books of a bookshelf
 *    security:
 *      - okta: []
 *    tags:
 *      - User bookshelf books
 *    parameters:
 *      - in: path
 *        name: bookshelfId
 *        type: number
 *        required: true
 *    responses:
 *      200:
 *        description: Returns array of books
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              item:
 *                $ref: '#/components/schemas/Bookshelf'
 *              example:
 *                books: [{shelfId: 1, bookId: 1, readingStatus: Reading, thumbnail: 'imagelink.fakeurl'}]
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      400:
 *        description: Bad Request - Bookshelf with that id does not exist
 */
router.get('/:bookshelfId/books', [checkForBookshelf], getAllBooksOfAShelf);

/**
 * @swagger
 * /api/user-shelf-book/{bookshelfId}/book/{userBookId}:
 *  delete:
 *    description: Delete a book from a shelf
 *    summary: Delete a book from a shelf
 *    security:
 *      - okta: []
 *    tags:
 *      - User bookshelf books
 *    parameters:
 *      - in: path
 *        name: bookshelfId
 *        type: number
 *        required: true
 *      - in: path
 *        name: userBookId
 *        type: number
 *        required: true
 *    responses:
 *      200:
 *        description: Deleted
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              item:
 *                $ref: '#/components/schemas/Bookshelf'
 *              example:
 *                message: "Successful"
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      400:
 *        description: Bad Request - Book not in bookshelf
 */
router.delete(
  '/:bookshelfId/book/:bookId',
  [checkForUserShelfBook],
  deleteBookFromShelf
);

/**
 * @swagger
 * /api/user-shelf-book/{bookshelfId}/book/{userBookId}:
 *  post:
 *    description: Add a book to a shelf
 *    summary: Add a book to a shelf
 *    security:
 *      - okta: []
 *    tags:
 *      - User bookshelf books
 *    requestBody:
 *      description: User Shelf Book Object
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#components/schemas/Bookshelf'
 *    responses:
 *      200:
 *        description: Returns object with shelf id and book id
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              item:
 *                $ref: '#/components/schemas/UserShelfBook'
 *              example:
 *                shelfId: 1
 *                bookId: 1
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      400:
 *        description: Bad Request - Book not in bookshelf
 */
router.post('/', [createUserShelfBookRequirements], addABookToABookshelf);

async function getAllBooksOfAShelf(req, res) {
  try {
    const books = await UserShelfBook.findBooksByShelfId(req.bookshelf.id);
    return res.status(200).json({ status: 'Successful', books });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 'Failure', error: 'Server failed.' });
  }
}

async function addABookToABookshelf(req, res) {
  try {
    const userShelfBook = await UserShelfBook.insert(
      req.body.shelfId,
      req.body.bookId
    );
    return res.status(200).json({ status: 'Successful', book: userShelfBook });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 'Failure', error: 'Server failed.' });
  }
}

async function deleteBookFromShelf(req, res) {
  try {
    const userShelfBook = await UserShelfBook.remove(
      req.params.bookshelfId,
      req.params.bookId
    );
    return res.status(200).json({ status: 'Successful', book: userShelfBook });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 'Failure', error: 'Server failed.' });
  }
}

module.exports = router;
