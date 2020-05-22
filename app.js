const express = require("express");
const bodyParser = require("body-parser");
const knex = require("knex");
const knexfile = require("./knexfile");
const { redditCronJob } = require("./cron/redditCron");
const session = require("express-session");

const databaseEnvironment = "development";

const app = express();
const db = knex(knexfile[databaseEnvironment]);

redditCronJob.start();

const sess = {
  secret: "RANDOMASSSECRETTHOUGH92318047!@khKJ",
  cookie: {},
  resave: false,
  saveUninitialized: true,
};

if (app.get("env") === "production") {
  // Use secure cookies in production (requires SSL/TLS)
  sess.cookie.secure = true;

  // Uncomment the line below if your application is behind a proxy (like on Heroku)
  // or if you're encountering the error message:
  // "Unable to verify authorization request state"
  // app.set('trust proxy', 1);
}

app.use(session(sess));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

db("titles").then((titles) => console.log("titles", titles));
db("users").then((users) => console.log("users", users));
db("posts").then((posts) => console.log("posts", posts));

app.post("/save-title", async (req, res) => {
  const user = req.body.user;
  const title = req.body.title;
  await db("titles").insert({ user: user, title: title });
  await db("titles").then((titles) => console.log("titles", titles));
  res.status(200).json({ message: "Title added to your list." });
});

app.get("/posts", (req, res) => {
  // const posts = db('')
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
