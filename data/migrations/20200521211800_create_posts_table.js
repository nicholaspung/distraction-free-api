exports.up = function (knex) {
  return knex.schema.createTable("posts", (table) => {
    table.increments();
    table.string("title");
    table.string("comments");
    table.string("url");
    table.integer("reddit_id");
    table.string("user");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("posts");
};
