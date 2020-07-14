exports.up = function (knex) {
  return knex.schema.createTable('userShelfBooks', function (table) {
    table
      .integer('bookId')
      .references('id')
      .inTable('userBooks')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      .notNullable();
    table
      .integer('shelfId')
      .references('id')
      .inTable('bookshelfs')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      .notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('userShelfBooks');
};
