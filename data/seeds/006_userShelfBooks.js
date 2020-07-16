const userShelfBooks = [...new Array(20)].map((_, i) => ({
  shelfId: i,
  bookId: i,
}));

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('userShelfBooks')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('userShelfBooks').insert(userShelfBooks);
    });
};
