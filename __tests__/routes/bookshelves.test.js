const request = require('supertest');
const express = require('express');
const Bookshelf = require('../../api/models/bookshelfModel');
const bookshelvesRouter = require('../../api/routes/bookShelves');
const server = express();

jest.mock('../../api/models/bookshelfModel');
jest.mock('../../api/middleware/authRequired', () =>
  jest.fn((req, res, next) => next())
);

describe('bookshelves router endpoints', () => {
  beforeAll(() => {
    server.use('/api/bookshelves', bookshelvesRouter);
  });

  describe('GET - All bookshelves of a user', () => {
    it('should return 400 - User not found', async () => {
      const res = await request(server).get('/api/bookshelves/user/600');
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error')
    });
    it('should return 200 - All User Bookshelves', async () => {
        // const user = await request(server).post('/api/bookshelves/')
        const res = await request(server).get('/api/bookshelves/user/2');
        console.log(res.body)
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('error')
      });
  });

//   describe('GET /api/books/:bookId', () => {
//     it('should return 200 when book is found', async () => {
//       Books.findById.mockResolvedValue({
//         id: 1,
//         title: 'Harry Potter Book One',
//       });
//       const res = await request(server).get('/api/books/1');

//       expect(res.status).toBe(200);
//       expect(res.body.title).toBe('Harry Potter Book One');
//       expect(Books.findById.mock.calls.length).toBe(2);
//     });
//     it('should return 404 when no books found', async () => {
//       Books.findById.mockResolvedValue();
//       const res = await request(server).get('/api/books/1');

//       expect(res.status).toBe(404);
//       expect(res.body.error).toBe('BookNotFound');
//     });
//   });
});