const db = require('../../data/db-config');

const findAll = async () => {
  return await db('userBooks as ub')
    .leftJoin('books as b', 'b.id', '=', 'ub.bookId')
    .leftJoin('readingStatuses as rs', 'rs.id', '=', 'ub.readingStatusId')
    .leftJoin('profiles as p', 'p.id', '=', 'ub.profileId')
    .select(
      'b.title',
      'b.authors',
      'rs.name',
      'ub.favourite',
      'ub.dateStarted',
      'ub.dateFinshed',
      'p.name as username'
    );
};

const findBy = async (filter) => {
  return await db('userBooks')
    .where(filter)
    .leftJoin('books as b', 'b.id', '=', 'ub.bookId')
    .leftJoin('readingStatuses as rs', 'rs.id', '=', 'ub.readingStatusId')
    .leftJoin('profiles as p', 'p.id', '=', 'ub.profileId')
    .select(
      'b.title',
      'b.authors',
      'rs.name',
      'ub.favourite',
      'ub.dateStarted',
      'ub.dateFinshed',
      'p.name as username'
    );
};

const findById = async (id) => {
  return db('userBooks')
    .where({ id })
    .first()
    .leftJoin('books as b', 'b.id', '=', 'ub.bookId')
    .leftJoin('readingStatuses as rs', 'rs.id', '=', 'ub.readingStatusId')
    .leftJoin('profiles as p', 'p.id', '=', 'ub.profileId')
    .select(
      'b.title',
      'b.authors',
      'rs.name',
      'ub.favourite',
      'ub.dateStarted',
      'ub.dateFinshed',
      'p.name as username'
    );
};

const create = async (userBook) => {
  const [id] = await db('userBooks').insert(userBook).returning('id');
  return findById(id);
};

const update = async (id, userBook) => {
  return db('userBooks')
    .where({ id: id })
    .first()
    .update(userBook)
    .leftJoin('books as b', 'b.id', '=', 'ub.bookId')
    .leftJoin('readingStatuses as rs', 'rs.id', '=', 'ub.readingStatusId')
    .leftJoin('profiles as p', 'p.id', '=', 'ub.profileId')
    .select(
      'b.title',
      'b.authors',
      'rs.name',
      'ub.favourite',
      'ub.dateStarted',
      'ub.dateFinshed',
      'p.name as username'
    );
};

const remove = async (id) => {
  return await db('userBooks').where({ id }).del();
};

module.exports = { findAll, findBy, findById, create, update, remove };
