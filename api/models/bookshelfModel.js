const db = require('../../data/db-config');

const findAllBookshelfsByUserId = async (userId) => {
  return db('bookshelfs').where({ profileId: userId });
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
  insert,
  findById,
  remove,
  update,
};
