const db = require('../data/db-config');
const userShelfBooks = require('./integrationtests/userShelfBooks.test');
const bookshelves = require('./integrationtests/bookshelves.test');
describe('Integration Tests', () => {
  beforeAll(async () => {
    return db.migrate.latest({ directory: './data/migrations' });
  });
  afterAll(async () => {
    await db.migrate.rollback({ directory: './data/migrations' });
    return db.destroy();
  });
  userShelfBooks;
  bookshelves;
});
