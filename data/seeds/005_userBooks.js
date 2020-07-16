const faker = require('faker');

const userBooks = [...new Array(20)].map((_, i) => ({
  id: i,
  readingStatusId: faker.random.number(2),
  bookId: i,
  profileId: String(i),
  favourite: false,
}));

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('userBooks')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('userBooks').insert(userBooks);
    });
};
