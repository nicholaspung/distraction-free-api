const db = require('../data/config');

const get = (user) => {
  return db('users').where('user', user);
};

const insert = (user) => {
  return db('users').insert({ user: user });
};

const del = (user) => {
  return db('users').where('user', user).del();
};

module.exports = {
  get,
  insert,
  del,
};
