exports.up = function (knex) {
  return knex.schema.createTable('read_posts', (table) => {
    table.increments();
    table.string('user').notNullable();
    table.integer('reddit_id').notNullable();
    table.boolean('read').notNullable().defaultTo(true);
    table.timestamp('date').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('read_posts');
};
