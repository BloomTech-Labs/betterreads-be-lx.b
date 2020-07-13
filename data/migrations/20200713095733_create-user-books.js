exports.up = function (knex) {
  return knex.schema.createTable('userBooks', function (table) {
    table.increments();
    table
      .integer('readingStatusId')
      .references('id')
      .inTable('readingStatuses')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.boolean('favourite').defaultTo(false);
    table.date('dateStarted').defaultTo(null);
    table.date('dateFinshed').defaultTo(null);
    table.integer('currentPage').defaultTo(null);
    table
      .integer('bookId')
      .references('id')
      .inTable('books')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      .notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('userBooks');
};
