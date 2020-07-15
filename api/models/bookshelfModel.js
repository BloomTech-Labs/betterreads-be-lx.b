const db = require('../../data/db-config');

const findAllBookshelfsByUserId = async (userId) => {
  return db('bookshelfs').where({ profileId: userId });
};

const getAllBooksOfABookShelf = async (shelfId) => {
  return db('userShelfBooks as usb')
    .where('usb.shelfId', '=', shelfId)
    .join('userBooks as ub', 'ub.id', '=', 'usb.bookId')
    .join('books as b', 'b.id', '=', 'ub.id')
    .join('readingStatuses as rs', 'rs.id', '=', 'ub.readingStatusId')
    .select([
      'usb.shelfId',
      'usb.bookId',
      'rs.name as readingStatus',
      'b.title',
      'b.thumbnail',
    ]);
};

const insert = async (bookshelf) => {
  const [id] = await db('bookshelfs').insert(bookshelf).returning('id');
  return findById(id);
};

const update = async (body) => {
  const [res] = await db('bookshelfs')
    .update(body)
    .where({ id: body.id })
    .returning('*');
  return res;
};

function findById(bookshelfId) {
  return db('bookshelfs').where({ id: bookshelfId }).first();
}

function findByName(name) {
  return db('bookshelfs').where({ name }).first();
}

const remove = (bookshelfId) => {
  return db('bookshelfs').del().where({ id: bookshelfId });
};

module.exports = {
  findAllBookshelfsByUserId,
  findByName,
  getAllBooksOfABookShelf,
  insert,
  findById,
  remove,
  update,
};
