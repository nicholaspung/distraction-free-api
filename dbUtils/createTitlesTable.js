async function createTitlesTable(db) {
  try {
    const hasTitlesTable = await db.schema.hasTable("titles");
    if (!hasTitlesTable) {
      await db.schema.createTable("titles", (table) => {
        table.increments();
        table.string("user");
        table.string("title");
      });
    }
  } catch (err) {
    console.error("Table created.", err);
    throw err;
  }
  db.destroy();
}

module.exports = createTitlesTable;
