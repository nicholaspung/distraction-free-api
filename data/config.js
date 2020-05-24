const knex = require('knex');
const knexfile = require('../knexfile');

const databaseEnvironment = 'development';
const db = knex(knexfile[databaseEnvironment]);

module.exports = db;
