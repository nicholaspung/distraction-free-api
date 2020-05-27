exports.up = function (knex) {
  knex.schema.alterTable('posts', (table) => {
    table.unique('reddit_id');
  });
};

exports.down = function (knex) {
  knex.schema.table('posts', (table) => {
    table.dropColumn('reddit_id');
  });
};
