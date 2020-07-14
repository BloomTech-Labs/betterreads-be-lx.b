const db = require('../../data/db-config');

const findAll = async () => {
  return await db('userBooks');
};

const findBy = async (filter) => {
  return await db('userBooks').where(filter);
};

const findById = async (id) => {
  return db('userBooks').where({ id }).first();
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
    .returning('*');
};

const remove = async (id) => {
  return await db('userBooks').where({ id }).del();
};

module.exports = { findAll, findBy, findById, create, update, remove };
