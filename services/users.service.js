const db = require('../data/config');

const get = (user) => {
  return db('users').where('user', user);
};

const insert = (user) => {
  return db('users').insert({ user: user, last_queried: new Date() });
};

const updateLastQueried = (user, last_queried) => {
  return db('users')
    .where('user', user)
    .update({ last_queried: last_queried || new Date() });
};

const del = (user) => {
  return db('users').where('user', user).del();
};

module.exports = {
  get,
  insert,
  updateLastQueried,
  del,
};
