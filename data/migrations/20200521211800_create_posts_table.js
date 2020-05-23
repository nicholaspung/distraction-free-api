exports.up = function (knex) {
  return knex.schema.createTable("posts", (table) => {
    table.increments();
    table.string("title").notNullable();
    table.string("comments").notNullable();
    table.string("url").notNullable();
    table.integer("reddit_id").notNullable();
    table.string("user").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("posts");
};
