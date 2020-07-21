const request = require('supertest');
const express = require('express');
const userShelfBooksRouter = require('../../api/routes/userShelfBooks');
const server = express();
const db = require('../../data/db-config');

const userShelfBook = {
  shelfId: 1,
  bookId: 1,
};
jest.mock('../../api/middleware/authRequired', () =>
  jest.fn((req, res, next) => next())
);

module.exports = describe('userShelfBooks router endpoints', () => {
  beforeAll(async () => {
    server.use(express.json());
    server.use('/api/user-shelf-books', userShelfBooksRouter);
  });
  beforeEach(async () => {
    return db.seed.run({ directory: './data/seeds' });
  });
  afterEach(async () => {
    return db.seed.run({ directory: './data/seeds' });
  });

  describe('GET /api/user-shelf-books/{bookshelfId}/books', () => {
    it('should return 200 returning all books from bookshelfs with ID of 1', async () => {
      const res = await request(server).get('/api/user-shelf-books/1/books');
      expect(res.status).toBe(200);
      expect(res.body.books.length).toBeGreaterThan(0);
      expect(Object.keys(res.body.books[0]).length).toBeGreaterThan(0);
    });
    it('should return 404 because bookshelf does not exist', async () => {
      const res = await request(server).get('/api/user-shelf-books/20/books');
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('DELETE /api/user-shelf-books/{bookshelfId}/book/{bookId}', () => {
    it('should return 200 returning deleted message', async () => {
      const res = await request(server).delete(
        '/api/user-shelf-books/1/book/1'
      );
      expect(res.status).toBe(200);
      expect(res.body.book).toBe(1);
    });
    it('should return 400 because book does not exist in that shelf', async () => {
      const res = await request(server).delete(
        '/api/user-shelf-books/1/book/2'
      );
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('POST /api/user-shelf-books/', () => {
    it('should return 201 returning newly created connection between book and bookshelf', async () => {
      const res = await request(server)
        .post('/api/user-shelf-books/')
        .send({ ...userShelfBook, bookId: 2 });
      console.log(res.body);
      expect(res.status).toBe(201);
      expect(Object.keys(res.body.book).length).toBeGreaterThan(0);
    });
    it('should return 400 because book is already in bookshelf', async () => {
      await request(server)
        .post('/api/user-shelf-books/')
        .send({ ...userShelfBook, bookId: 2 });
      const res = await request(server)
        .post('/api/user-shelf-books/')
        .send({ ...userShelfBook, bookId: 2 });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
    it('should return 400 because bookId is a required field', async () => {
      const badUserShelfBook = { ...userShelfBook };
      delete badUserShelfBook.bookId;
      const res = await request(server)
        .post('/api/user-shelf-books/')
        .send(badUserShelfBook);
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
    it('should return 400 because shelfId is a required field', async () => {
      const badUserShelfBook = { ...userShelfBook };
      delete badUserShelfBook.shelfId;
      const res = await request(server)
        .post('/api/user-shelf-books/')
        .send(badUserShelfBook);
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
  });
});
