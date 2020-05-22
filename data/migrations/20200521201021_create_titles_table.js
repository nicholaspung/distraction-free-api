exports.up = function (knex) {
  return knex.schema.createTable("titles", (table) => {
    table.increments();
    table.string("user");
    table.string("title");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("titles");
};
