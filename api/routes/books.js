const express = require('express');
const authRequired = require('../middleware/authRequired');
const checkForBooks = require('../middleware/booksCheckFor');
const checkForSingleBook = require('../middleware/checkForSingleBook');
const createBookRequirements = require('../middleware/createBookRequirements');
const Books = require('../models/booksModel');
const router = express.Router();

router.use(authRequired);

/**
 * @swagger
 * components:
 *  schemas:
 *    Book:
 *      type: object
 *      required:
 *        - googleId
 *      properties:
 *        id:
 *          type: integer
 *          description: book ID
 *        googleId:
 *          type: string
 *          description: Google ID associatted with book
 *        title:
 *          type: string
 *        eTag:
 *          type: string
 *        authors:
 *          type: string
 *        publisher:
 *          type: string
 *        publishDate:
 *          type: string
 *        description:
 *          type: string
 *        isbn10:
 *          type: string
 *        isbn13:
 *          type: string
 *        pageCount:
 *          type: integer
 *        categories:
 *          type: string
 *        maturityRating:
 *          type: string
 *        thumbnail:
 *          type: string
 *        smallThumbnail:
 *          type: string
 *        language:
 *          type: string
 *        webReaderLink:
 *          type: string
 *        textSnippet:
 *          type: string
 *        bookFormats:
 *          type: string
 *        retailPrice:
 *          type: integer
 *      example:
 *        id: 1
 *        title: 'Harry Potter Book One'
 *        etag: None
 *        authors: 'Someones name here'
 *        publisher: None
 *        publishDate: '12/23/2020'
 *        description: 'A book about magic or something'
 *        isbn10: None
 *        isbn13: None
 *        pageCount: 350
 *        categories: 'Fiction, magic and adventure'
 *        maturityRating: 'Teen'
 *        thumbnail: 'google.com'
 *        smallThumbnail: 'google.com'
 *        language: 'English'
 *        webReaderLink: None
 *        textSnippet: 'Oh boy this book is great...'
 *        bookFormats: 'Digital and Physical'
 *        retailPrice: 25
 * /api/books:
 *  get:
 *    description: Returns a list of books
 *    summary: Get a list of all books
 *    security:
 *      - okta: []
 *    tags:
 *      - books
 *    responses:
 *      200:
 *        description: array of books
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Book'
 *              example:
 *                - id: 1
 *                  title: 'Harry Potter Book One'
 *                  etag: None
 *                  authors: 'Someones name here'
 *                  publisher: None
 *                  publishDate: '12/23/2020'
 *                  description: 'A book about magic or something'
 *                  isbn10: None
 *                  isbn13: None
 *                  pageCount: 350
 *                  categories: 'Fiction, magic and adventure'
 *                  maturityRating: 'Teen'
 *                  thumbnail: 'google.com'
 *                  smallThumbnail: 'google.com'
 *                  language: 'English'
 *                  webReaderLink: None
 *                  textSnippet: 'Oh boy this book is great...'
 *                  bookFormats: 'Digital and Physical'
 *                  retailPrice: 25
 *                - id: 2
 *                  title: 'Harry Potter Book two'
 *                  etag: None
 *                  authors: 'Someones name here'
 *                  publisher: None
 *                  publishDate: '01/23/2020'
 *                  description: 'A book  also about magic or something'
 *                  isbn10: None
 *                  isbn13: None
 *                  pageCount: 700
 *                  categories: 'Fiction, magic and adventure'
 *                  maturityRating: 'Teen'
 *                  thumbnail: 'google.com'
 *                  smallThumbnail: 'google.com'
 *                  language: 'English'
 *                  webReaderLink: None
 *                  textSnippet: 'Oh boy this book is also great...'
 *                  bookFormats: 'Digital and Physical'
 *                  retailPrice: 50
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 */

router.get('/', checkForBooks, (req, res) => {
  Books.findAll()
    .then((books) => {
      res.status(200).json(books);
    })
    .catch((err) => {
      res.status(500).json({ message: 'Unable to retrieve books', err });
    });
});

/**
 * @swagger
 * components:
 *  parameters:
 *    bookId:
 *      name: id
 *      in: path
 *      description: ID of the book to return
 *      required: true
 *      example: 1
 *      schema:
 *        type: integer
 *
 * /api/books/{bookId}:
 *  get:
 *    description: Find books by ID
 *    summary: Returns single book
 *    security:
 *      - okta: []
 *    tags:
 *      - books
 *    parameters:
 *      - $ref: '#/components/parameters/bookId'
 *    responses:
 *      200:
 *        description: A book object
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Book'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 */

router.get('/:bookId', checkForSingleBook, (req, res) => {
  const { bookId } = req.params;
  Books.findById(bookId)
    .then((book) => {
      res.status(200).json(book);
    })
    .catch((err) => {
      res.status(500).json({ message: 'Unable to retrieve request book', err });
    });
});

/**
 * @swagger
 * /api/books:
 *  post:
 *    summary: Add a book
 *    security:
 *      - okta: []
 *    tags:
 *      - books
 *    requestBody:
 *      description: Book object to to be added
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Book'
 *    responses:
 *      400:
 *        description: MissingGoogleId
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      200:
 *        description: A book object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: book created
 *                profile:
 *                  $ref: '#/components/schemas/Book'
 */

router.post('/', createBookRequirements, (req, res) => {
  var book = req.body;
  Books.create(book)
    .then((book) => {
      res
        .status(201)
        .json({ message: 'Book successfully added our database', book });
    })
    .catch((err) => {
      res.status(500).json({ message: 'Server unable to add book', err });
    });
});

/**
 * @swagger
 * /api/books/{bookId}:
 *  delete:
 *    summary: Remove a book
 *    security:
 *      - okta: []
 *    tags:
 *      - books
 *    parameters:
 *      - $ref: '#/components/parameters/bookId'
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
 *        description: A book object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: Book 1 was deleted.
 *                books:
 *                  $ref: '#/components/schemas/Book'
 */

router.delete('/:bookId', checkForSingleBook, (req, res) => {
  Books.remove(req.params.bookId)
    .then((book) => res.status(204).json(book))
    .catch((err) => {
      res.status(500).json({ message: 'Server failed to delete book', err });
    });
});

/**
 * @swagger
 * /api/books/{bookId}:
 *  put:
 *    summary: Update a book
 *    security:
 *      - okta: []
 *    tags:
 *      - books
 *    requestBody:
 *      description: Book object to to be updated
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Book'
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
 *        description: A book object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: book created
 *                books:
 *                  $ref: '#/components/schemas/Book'
 */

router.put('/:bookId', checkForSingleBook, (req, res) => {
  const body = req.body;
  Books.update(req.params.bookId, body)
    .then((book) => {
      res.status(200).json(book);
    })
    .catch((err) => {
      res.status(500).json({ message: 'Server failed to update book', err });
    });
});

module.exports = router;
