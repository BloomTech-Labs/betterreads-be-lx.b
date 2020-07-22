const request = require('supertest');
const express = require('express');
const booksRouter = require('../../api/routes/books');
const server = express();
const db = require('../../data/db-config');

const bookBody = {
  title: 'Testing Book',
  googleId: 'sfdfjkj00928xyz',
};
jest.mock('../../api/middleware/authRequired', () =>
  jest.fn((req, res, next) => next())
);

module.exports = describe('book router endpoints', () => {
  beforeAll(async () => {
    server.use(express.json());
    server.use('/api/books', booksRouter);
  });
  beforeEach(async () => {
    return db.seed.run({ directory: './data/seeds' });
  });
  afterEach(async () => {
    return db.seed.run({ directory: './data/seeds' });
  });

  describe('GET /api/books', () => {
    it('should return 200 returning all seeded books', async () => {
      const res = await request(server).get('/api/books');
      expect(res.status).toBe(200);
      expect(res.body.books.length).toBeGreaterThan(0);
    });
  });
});
