const faker = require('faker');

const books = [...new Array(20)].map((_, i) => ({
  id: i,
  googleId: String(i),
  title: faker.lorem.words(4),
  eTag: faker.lorem.word(),
  authors: faker.name.firstName(),
  publisher: faker.name.firstName(),
  publishDate: Date.now(),
  description: faker.lorem.words(15),
  isbn10: faker.random.alphaNumeric(10),
  isbn13: faker.random.alphaNumeric(13),
  pageCount: 400,
  categories: faker.lorem.words(5),
  maturityRating: 'R',
  thumbnail: faker.image.image(),
  smallThumbnail: faker.image.image(),
  language: faker.lorem.word(),
  webReaderLink: faker.internet.domainName(),
  textSnippet: faker.lorem.words(50),
  bookFormats: 'Hard Copy',
  retailPrice: faker.random.number(40),
}));

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('books')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('books').insert(books);
    });
};
