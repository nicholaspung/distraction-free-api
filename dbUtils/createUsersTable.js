async function createUsersTable(db) {
  try {
    const hasUsersTable = await db.schema.hasTable("users");
    if (!hasUsersTable) {
      await db.schema.createTable("users", (table) => {
        table.increments();
        table.string("user");
      });
    }
  } catch (err) {
    console.error("Table created.", err);
    throw err;
  }
  db.destroy();
}

module.exports = createUsersTable;
