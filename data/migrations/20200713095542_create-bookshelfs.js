exports.up = function (knex) {
  return knex.schema.createTable('bookshelfs', function (table) {
    table.increments();
    table.string('name').notNullable();
    table.boolean('private').default(false);
    table
      .string('profileId')
      .references('id')
      .inTable('profiles')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('bookshelfs');
};
