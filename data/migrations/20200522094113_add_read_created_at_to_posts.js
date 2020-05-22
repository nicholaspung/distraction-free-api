exports.up = function (knex) {
  knex.schema.table("posts", (table) => {
    table.boolean("read").defaultTo(false);
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  knex.schema.table("posts", (table) => {
    table.dropColumn("read");
    table.dropColumn("created_at");
  });
};
