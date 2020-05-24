const db = require('../data/config');

const insert = ({ user }) => {
  return db('users').insert({ user: user });
};

module.exports = {
  insert,
};
