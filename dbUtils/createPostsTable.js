async function createPostsTable(db) {
  try {
    const hasPostsTable = await db.schema.hasTable("posts");
    if (!hasPostsTable) {
      await db.schema.createTable("posts", (table) => {
        table.increments();
        table.string("title");
        table.string("comments");
        table.string("url");
        table.integer("reddit_id");
        table.string("user");
      });
    }
  } catch (err) {
    console.error("Table created.", err);
    throw err;
  }
  db.destroy();
}

module.exports = createPostsTable;
