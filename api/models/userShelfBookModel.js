const db = require('../../data/db-config');
const findBooksByShelfId = async (shelfId) => {
  return db('userShelfBooks as usb')
    .where('usb.shelfId', '=', shelfId)
    .leftJoin('userBooks as ub', 'ub.id', '=', 'usb.bookId')
    .leftJoin('books as b', 'b.id', '=', 'ub.id')
    .leftJoin('readingStatuses as rs', 'rs.id', '=', 'ub.readingStatusId')
    .select([
      'usb.shelfId',
      'usb.bookId',
      'rs.name as readingStatus',
      'b.title',
      'b.thumbnail',
    ]);
};

const findBookInBookshelf = async (shelfId, bookId) => {
  return db('userShelfBooks').where({ shelfId, bookId }).first();
};

const insert = async (shelfId, bookId) => {
  return db('userShelfBooks').insert({ shelfId, bookId }).returning('*');
};

const remove = async (shelfId, bookId) => {
  return db('userShelfBooks').del().where({ shelfId, bookId });
};

module.exports = { findBooksByShelfId, findBookInBookshelf, insert, remove };
