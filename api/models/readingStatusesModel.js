const db = require('../../data/db-config');

const findAll = async () => {
  return await db('readingStatuses');
};

const findBy = async (filter) => {
  return await db('readingStatuses').where(filter);
};

const findById = async (id) => {
  return db('readingStatuses').where({ id }).first();
};

const create = async (readingStatus) => {
  const [id] = await db('readingStatuses')
    .insert(readingStatus)
    .returning('id');
  return findById(id);
};

const update = async (id, readingStatus) => {
  return db('readingStatuses')
    .where({ id: id })
    .first()
    .update(readingStatus)
    .returning('*');
};

const remove = async (id) => {
  return await db('readingStatuses').where({ id }).del();
};

module.exports = { findAll, findBy, findById, create, update, remove };
