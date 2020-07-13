exports.up = function (knex) {
  return knex.schema.createTable('readingStatuses', function (table) {
    table.increments();
    table.string('name').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('readingStatuses');
};
