exports.up = function (knex) {
  return knex.schema.dropTable('posts');
};

exports.down = function (knex) {
  return;
};
