const request = require('supertest');
const express = require('express');
const Books = require('../../api/models/booksModel');
const booksRouter = require('../../api/routes/books');
const server = express();

jest.mock('../../api/models/booksModel');
jest.mock('../../api/middleware/authRequired', () =>
  jest.fn((req, res, next) => next())
);

describe('books router endpoints', () => {
  beforeAll(() => {
    server.use('/api/books', booksRouter);
  });

  describe('GET /api/books', () => {
    it('should return 404 for no books being in db', async () => {
      Books.findAll.mockResolvedValue([]);
      const res = await request(server).get('/api/books');

      expect(res.status).toBe(404);
      expect.objectContaining({
        erorr: 'No books were found',
      });
      expect(Books.findAll.mock.calls.length).toBe(1);
    });
  });

  describe('GET /api/books/:bookId', () => {
    it('should return 200 when book is found', async () => {
      Books.findById.mockResolvedValue({
        id: 1,
        title: 'Harry Potter Book One',
      });
      const res = await request(server).get('/api/books/1');

      expect(res.status).toBe(200);
      expect(res.body.title).toBe('Harry Potter Book One');
      expect(Books.findById.mock.calls.length).toBe(2);
    });
    it('should return 404 when no books found', async () => {
      Books.findById.mockResolvedValue();
      const res = await request(server).get('/api/books/1');

      expect(res.status).toBe(404);
      expect(res.body.error).toBe('BookNotFound');
    });
  });
});
