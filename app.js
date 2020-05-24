const express = require('express');
const bodyParser = require('body-parser');
const db = require('./data/config');
const router = require('./routes');

// For Auth0
const jwtAuthz = require('express-jwt-authz');
const checkJwt = require('./lib/middleware/checkJwt');

const app = express();

// const { redditCronJob } = require("./cron/redditCron");
// redditCronJob(db).start();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(router);

db('master_posts').then((masterPosts) => console.log('master_posts', masterPosts));
db('titles').then((titles) => console.log('titles', titles));
db('users').then((users) => console.log('users', users));
db('posts').then((posts) => console.log('posts', posts));

// Sample routes for Auth0
app.get('/api/public', function (req, res) {
  res.json({
    message: "Hello from a public endpoint! You don't need to be autheticated to see this.",
  });
});

app.get('/api/private', checkJwt, function (req, res) {
  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated to see this.',
  });
});
const checkScopes = jwtAuthz(['read:messages ']);
app.get('/api/private-scoped', checkJwt, checkScopes, function (req, res) {
  res.json({
    message:
      'Hello from a private endpoint! You need to be autheticated and have a scope of read:messages to see this.',
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
