const db = require('../data/config');

const getSorted = (user) => {
  return db('titles').where('user', user).orderBy('title', 'asc');
};

const insert = ({ user, title }) => {
  return db('titles').insert({ user, title });
};

const del = ({ user, title }) => {
  return db('titles').where('user', user).andWhere('title', title).del();
};

/* Used for debugging */
const get = (user) => {
  return db('titles').where('user', user);
};

const update = ({ user, id, title }) => {
  return db('titles').where('user', user).andWhere('id', id).update({ title });
};

module.exports = {
  get,
  getSorted,
  insert,
  update,
  del,
};
