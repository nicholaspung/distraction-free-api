const knex = require('knex');
const knexfile = require('../knexfile');
require('dotenv').config();

const databaseEnvironment = process.env.DB_ENV || 'development';
const db = knex(knexfile[databaseEnvironment]);

module.exports = db;
