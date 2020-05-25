exports.up = function (knex) {
  knex.schema.table('users', (table) => {
    table.timestamp('last_queried');
  });
};

exports.down = function (knex) {
  knex.schema.table('users', (table) => {
    table.dropColumn('last_queried');
  });
};
