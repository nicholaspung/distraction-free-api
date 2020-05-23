const express = require("express");
const bodyParser = require("body-parser");

const knex = require("knex");
const knexfile = require("./knexfile");

// const { redditCronJob } = require("./cron/redditCron");

const checkJwt = require("./lib/middleware/checkJwt");
const jwtAuthz = require("express-jwt-authz");

const app = express();
const databaseEnvironment = "development";
const db = knex(knexfile[databaseEnvironment]);

// redditCronJob.start();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

db("titles").then((titles) => console.log("titles", titles));
db("users").then((users) => console.log("users", users));
db("posts").then((posts) => console.log("posts", posts));

app.post("/save-title", async (req, res) => {
  const { user, title } = req.body;
  await db("titles").insert({ user: user, title: title });
  await db("titles").then((titles) => console.log("titles", titles));
  res.status(201).json({ message: "Title added to your list." });
});

app.post("/users", async (req, res) => {
  const { user } = req.body;
  await db("users").insert({ user: user });
  await db("users").then((users) => console.log("users", users));
  res.status(201).json({ message: "User has been created." });
});

app.post("/posts", async (req, res) => {
  const { title, comments, url, reddit_id, user } = req.body;
  await db("posts").insert({
    title: title,
    comments: comments,
    url: url,
    reddit_id: reddit_id,
    user: user,
  });
  await db("posts").then((posts) => console.log("posts", posts));
  res.status(201).json({ message: "Post added to your list." });
});

app.get("/api/public", function (req, res) {
  res.json({
    message:
      "Hello from a public endpoint! You don't need to be autheticated to see this.",
  });
});

app.get("/api/private", checkJwt, function (req, res) {
  res.json({
    message:
      "Hello from a private endpoint! You need to be authenticated to see this.",
  });
});
const checkScopes = jwtAuthz(["read:messages "]);
app.get("/api/private-scoped", checkJwt, checkScopes, function (req, res) {
  res.json({
    message:
      "Hello from a private endpoint! You need to be autheticated and have a scope of read:messages to see this.",
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
