exports.up = function (knex) {
  return knex.schema.createTable('master_posts', (table) => {
    table.increments();
    table.timestamp('date').notNullable();
    table.json('reddit_posts').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('master_posts');
};
