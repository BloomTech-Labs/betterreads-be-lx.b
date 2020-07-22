const request = require('supertest');
const express = require('express');
const bookshelfRouter = require('../../api/routes/bookShelves');
const Bookshelf = require('../../api/models/bookshelfModel')
const UserShelfBook = require('../../api/models/userShelfBookModel')
const server = express();
const db = require('../../data/db-config');

jest.mock('../../api/middleware/authRequired', () =>
  jest.fn((req, res, next) => next())
);
jest.mock('../../api/models/bookshelfModel');
jest.mock('../../api/models/userShelfBookModel');


module.exports = describe('bookshelf router endpoints', () => {
  beforeAll(async () => {
    server.use(express.json());
    server.use('/api/bookshelves', bookshelfRouter);
  });
  describe('GET /api/bookselves/user/{userId}', () => {
    it('should return 200 returning all seeded bookshelfs of the user with ID of 1', async () => {
      Bookshelf.findAllBookshelfsByUserId.mockResolvedValue([
        {
          id: 1,
          name: "This is a bookshelf",
          private: false        
        }
      ])
      UserShelfBook.findBooksByShelfId.mockResolvedValue([
        {
          shelfId: 1,
          title: "This is a book from the bookshelf"
        }
      ])
      const res = await request(server).get('/api/bookshelves/user/1');
      expect(res.status).toBe(200);
      expect(res.body.bookshelfs.length).toBeGreaterThan(0);
      expect(res.body.bookshelfs[0].books.length).toBeGreaterThan(0);
    });
  });

  describe('GET /api/bookselves/{bookshelfId}', () => {
    it('should return 200 returning bookshelf with Id of 1', async () => {
      Bookshelf.findById.mockResolvedValue(
        {
          id: 1,
          name: "This is a bookshelf",
          private: false        
        }
      )
      UserShelfBook.findBooksByShelfId.mockResolvedValue([
        {
          shelfId: 1,
          title: "This is a book from the bookshelf"
        }
      ])
      const res = await request(server).get('/api/bookshelves/1');
      expect(res.status).toBe(200);
      expect(Object.keys(res.body.bookshelf).length).toBeGreaterThan(0);
      expect(res.body.bookshelf.books.length).toBeGreaterThan(0);
    });
  });

  describe('POST /api/bookselves/', () => {
    it('should return 201 returning newly created bookshelf', async () => {
      Bookshelf.insert.mockResolvedValue(
        {
          id: 1,
          name: "This is a new bookshelf",
          private: false        
        }
      )
      UserShelfBook.findBooksByShelfId.mockResolvedValue([])
      const res = await request(server)
        .post('/api/bookshelves')
        .send({
          name: "This is a new bookshelf",
          private: false,
          userId: 1       
        });
      expect(res.status).toBe(201);
      expect(Object.keys(res.body.bookshelf).length).toBeGreaterThan(0);
    });
  });
  describe('PUT /api/bookselves/1', () => {
    it('should return 200 returning edited bookshelf with id of 1', async () => {
      Bookshelf.update.mockResolvedValue(
        {
          id: 1,
          name: "This is an edited bookshelf",
          private: false        
        }
      )
      const res = await request(server)
        .put('/api/bookshelves/1')
        .send({
          name: "This is an edited bookshelf",
          private: false,
          userId: 1       
        });
        console
      expect(res.status).toBe(200);
      expect(res.body.bookshelf.name).toBe("This is an edited bookshelf");
      expect(res.body.bookshelf.private).toBe(false);
      expect(res.body.bookshelf.userId).not.toBe(1);
      expect(Object.keys(res.body.bookshelf).length).toBeGreaterThan(0);
    });
  });
  describe('DELETE /api/bookselves/1', () => {
    it('should return 200 returning message deleted', async () => {
      Bookshelf.remove.mockResolvedValue(1)
      const res = await request(server).delete(
        `/api/bookshelves/1`
      );
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('message');
    });
  });
});
