const request = require('supertest');
const express = require('express');
const bookshelfRouter = require('../../api/routes/bookShelves');
const server = express();
const db = require('../../data/db-config');

const bookshelfBody = {
  name: 'Testing Bookshelf',
  private: true,
  userId: '1',
};
jest.mock('../../api/middleware/authRequired', () =>
  jest.fn((req, res, next) => next())
);

module.exports = describe('bookshelf router endpoints', () => {
  beforeAll(async () => {
    server.use(express.json());
    server.use('/api/bookshelves', bookshelfRouter);
  });
  beforeEach(async () => {
    return db.seed.run({ directory: './data/seeds' });
  });
  afterEach(async () => {
    return db.seed.run({ directory: './data/seeds' });
  });

  describe('GET /api/bookselves/user/{userId}', () => {
    it('should return 200 returning all seeded bookshelfs of the user with ID of 1', async () => {
      const res = await request(server).get('/api/bookshelves/user/1');
      expect(res.status).toBe(200);
      expect(res.body.bookshelfs.length).toBeGreaterThan(0);
      expect(res.body.bookshelfs[0].books.length).toBeGreaterThan(0);
    });
    it('should return 404 because user does not exist', async () => {
      const res = await request(server).get('/api/bookshelves/user/20');
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('GET /api/bookselves/{bookshelfId}', () => {
    it('should return 200 returning bookshelf with Id of 1', async () => {
      const res = await request(server).get('/api/bookshelves/1');
      expect(res.status).toBe(200);
      expect(Object.keys(res.body.bookshelf).length).toBeGreaterThan(0);
      expect(res.body.bookshelf.books.length).toBeGreaterThan(0);
    });
    it('should return 404 because bookshelf does not exist', async () => {
      const res = await request(server).get('/api/bookshelves/20');
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('POST /api/bookselves/', () => {
    it('should return 201 returning newly created bookshelf', async () => {
      const res = await request(server)
        .post('/api/bookshelves')
        .send(bookshelfBody);
      expect(res.status).toBe(201);
      expect(Object.keys(res.body.bookshelf).length).toBeGreaterThan(0);
    });
    it('should return 400 because name must be unique to the user', async () => {
      await request(server).post('/api/bookshelves').send(bookshelfBody);
      const res = await request(server)
        .post('/api/bookshelves')
        .send(bookshelfBody);
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
    it('should return 400 because user does not exist', async () => {
      const res = await request(server)
        .post('/api/bookshelves')
        .send({ ...bookshelfBody, userId: '100' });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
    it('should return 400 because profileId is required', async () => {
      const badBookshelf = { ...bookshelfBody };
      delete badBookshelf.userId;
      const res = await request(server)
        .post('/api/bookshelves')
        .send(badBookshelf);
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
    it('should return 400 because name is required', async () => {
      const badBookshelf = { ...bookshelfBody };
      delete badBookshelf.name;
      const res = await request(server)
        .post('/api/bookshelves')
        .send(badBookshelf);
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
  });
  describe('PUT /api/bookselves/1', () => {
    it('should return 200 returning edited bookshelf with id of 1', async () => {
      const res = await request(server)
        .put('/api/bookshelves/1')
        .send(bookshelfBody);
      expect(res.status).toBe(200);
      expect(res.body.bookshelf.name).toBe(bookshelfBody.name);
      expect(res.body.bookshelf.private).toBe(bookshelfBody.private);
      expect(res.body.bookshelf.userId).not.toBe(bookshelfBody.userId);
      expect(Object.keys(res.body.bookshelf).length).toBeGreaterThan(0);
    });
    it('should return 400 because name must be unique to the user', async () => {
      await request(server)
        .post('/api/bookshelves')
        .send({ ...bookshelfBody, userId: '1' });
      const res = await request(server)
        .put('/api/bookshelves/1')
        .send(bookshelfBody);
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
    it('should return 404 because bookshelf does not exist', async () => {
      const res = await request(server)
        .put('/api/bookshelves/20')
        .send(bookshelfBody);
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('error');
    });
  });
  describe('DELETE /api/bookselves/1', () => {
    it('should return 200 returning message deleted', async () => {
      const created = await request(server)
        .post('/api/bookshelves/')
        .send(bookshelfBody);
      const res = await request(server).delete(
        `/api/bookshelves/${created.body.bookshelf.id}`
      );
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('message');
    });
    it('should return 404 because bookshelf does not exist', async () => {
      const res = await request(server)
        .delete('/api/bookshelves/20')
        .send(bookshelfBody);
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('error');
    });
  });
});
