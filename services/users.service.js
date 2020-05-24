const db = require('../data/config');

const insert = ({ user }) => {
  return db('users').insert({ user: user });
};

const get = (user) => {
  return db('users').where('user', user);
};

const del = (user) => {
  return db('users').where('user', user).del();
};

module.exports = {
  insert,
  get,
  del,
};
