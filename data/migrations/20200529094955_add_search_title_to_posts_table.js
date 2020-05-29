exports.up = function (knex) {
  return knex.schema.table('posts', (table) => {
    table.string('search_title');
  });
};

exports.down = function (knex) {
  return knex.schema.table('posts', (table) => {
    table.dropColumn('search_title');
  });
};
