const db = require('../data/config');

const insert = ({ user, title }) => {
  return db('titles').insert({ user: user, title: title });
};

module.exports = {
  insert,
};
