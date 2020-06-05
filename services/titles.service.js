const db = require('../data/config');

const get = (user) => {
  return db('titles').where('user', user);
};

const insert = ({ user, title }) => {
  return db('titles').insert({ user, title });
};

const update = ({ user, id, title }) => {
  return db('titles').where('user', user).andWhere('id', id).update({ title });
};

const del = ({ user, title }) => {
  return db('titles').where('user', user).andWhere('title', title).del();
};

module.exports = {
  get,
  insert,
  update,
  del,
};
