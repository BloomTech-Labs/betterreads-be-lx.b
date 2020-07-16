exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('readingStatuses')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('readingStatuses').insert([
        { id: 0, name: 'Not Read' },
        { id: 1, name: 'Reading' },
        { id: 2, name: 'Read' },
      ]);
    });
};
