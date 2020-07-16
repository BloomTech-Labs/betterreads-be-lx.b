const faker = require('faker');

const bookshelves = [...new Array(20)].map((_, i) => ({
  id: i,
  profileId: String(i),
  name: faker.lorem.words(2),
  private: false,
}));

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('bookshelfs')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('bookshelfs').insert(bookshelves);
    });
};
