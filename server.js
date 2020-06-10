const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes');

// For Swagger documentation
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./data/dbSchemas/swagger.json');

// For Auth0
const jwtAuthz = require('express-jwt-authz');
const checkJwt = require('./lib/middleware/checkJwt');

const server = express();

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
server.use('/', router);

// Sample routes for Auth0
server.get('/api/public', function (req, res) {
  res.json({
    message:
      "Hello from a public endpoint! You don't need to be autheticated to see this.",
  });
});

server.get('/api/private', checkJwt, function (req, res) {
  console.log(req.user);
  res.json({
    message:
      'Hello from a private endpoint! You need to be authenticated to see this.',
  });
});

const checkScopes = jwtAuthz(['read:messages ']);
server.get('/api/private-scoped', checkJwt, checkScopes, function (req, res) {
  res.json({
    message:
      'Hello from a private endpoint! You need to be autheticated and have a scope of read:messages to see this.',
  });
});

module.exports = server;
