const request = require('supertest');
const express = require('express');
const userShelfBooksRouter = require('../../api/routes/userShelfBooks');
const UserShelfBook = require('../../api/models/userShelfBookModel')
const server = express();


jest.mock('../../api/middleware/authRequired', () =>
  jest.fn((req, res, next) => next())
);
jest.mock('../../api/middleware/checkForUserShelfBook', () =>
  jest.fn((req, res, next) => next())
);
jest.mock('../../api/models/userShelfBookModel');

module.exports = describe('userShelfBooks router endpoints', () => {
  beforeAll(async () => {
    server.use(express.json());
    server.use('/api/user-shelf-books', userShelfBooksRouter);
  });

  describe('GET /api/user-shelf-books/{bookshelfId}/books', () => {
    it('should return 200 returning all books from bookshelfs with ID of 1', async () => {
      UserShelfBook.findBooksByShelfId.mockResolvedValue([
        {
          shelfId: 1,
          title: "This is a book from the bookshelf"
        }
      ])
      const res = await request(server).get('/api/user-shelf-books/1/books');
      expect(res.status).toBe(200);
      expect(res.body.books.length).toBeGreaterThan(0);
      expect(Object.keys(res.body.books[0]).length).toBeGreaterThan(0);
    });
  });

  describe('DELETE /api/user-shelf-books/{bookshelfId}/book/{bookId}', () => {
    it('should return 200 returning deleted message', async () => {
      UserShelfBook.remove.mockResolvedValue([1])
      const res = await request(server).delete(
        '/api/user-shelf-books/1/book/1'
      );
      expect(res.status).toBe(200);
    });
  });

  describe('POST /api/user-shelf-books/', () => {
    it('should return 201 returning newly created connection between book and bookshelf', async () => {
      UserShelfBook.insert.mockResolvedValue(
        {
          shelfId: 1,
          bookId: 1
        }
      )
      const res = await request(server)
        .post('/api/user-shelf-books/')
        .send({ shelfId: 1,
          bookId: 1 });
      expect(res.status).toBe(201);
      expect(Object.keys(res.body.book).length).toBeGreaterThan(0);
    });
  });
});
