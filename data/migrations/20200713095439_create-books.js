exports.up = (knex) => {
  return knex.schema.createTable('books', function (table) {
    table.increments();
    table.string('googleId').notNullable();
    table.string('title');
    table.string('eTag');
    table.string('authors');
    table.string('publisher');
    table.string('publishDate');
    table.string('description');
    table.string('isbn10');
    table.string('isbn13');
    table.integer('pageCount');
    table.string('categories');
    table.string('maturityRating');
    table.string('thumbnail', 1000);
    table.string('smallThumbnail', 1000);
    table.string('language');
    table.string('webReaderLink', 1000);
    table.string('textSnippet', 10000);
    table.string('bookFormats');
    table.integer('retailPrice');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('books');
};
