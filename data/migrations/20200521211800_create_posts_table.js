exports.up = function (knex) {
  return knex.schema.createTable('posts', (table) => {
    table.increments();
    table.string('title').notNullable();
    table.string('comments').notNullable();
    table.string('url').notNullable();
    table.integer('reddit_id').notNullable();
    table.string('user').notNullable();
    table.boolean('read').notNullable().defaultTo(false);
    table.timestamp('created_at').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('posts');
};
