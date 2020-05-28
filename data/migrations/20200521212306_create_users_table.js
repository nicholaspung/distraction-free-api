exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('user').notNullable();
    table.timestamp('last_queried');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
