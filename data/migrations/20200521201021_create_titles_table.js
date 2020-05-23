exports.up = function (knex) {
  return knex.schema.createTable("titles", (table) => {
    table.increments();
    table.string("user").notNullable();
    table.string("title").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("titles");
};
