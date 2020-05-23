exports.up = function (knex) {
  return knex.schema.createTable("master_posts", (table) => {
    table.increments();
    table.timestamp("date");
    table.json("reddit_posts");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("master_posts");
};
