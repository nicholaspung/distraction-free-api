const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// For Auth0
const jwtAuthz = require('express-jwt-authz');
const checkJwt = require('./lib/middleware/checkJwt');

const app = express();

// Cron Jobs
// const { redditCronJob } = require('./cron/redditCron');
// const { deletePostsCronJob } = require('./cron/deletePostsCron');
// redditCronJob().start();
// deletePostsCronJob().start();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', router);

// Sample routes for Auth0
app.get('/api/public', function (req, res) {
  res.json({
    message: "Hello from a public endpoint! You don't need to be autheticated to see this.",
  });
});

app.get('/api/private', checkJwt, function (req, res) {
  console.log(req.user);
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
