const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./routes');

// For Swagger documentation
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./data/dbSchemas/swagger.json');

const server = express();

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(cors());

server.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
server.use('/', router);

module.exports = server;
