const db = require('../data/config');

const get = (user) => {
  return db('titles').where('user', user);
};

const insert = ({ user, title }) => {
  return db('titles').insert({ user: user, title: title });
};

const update = ({ user, prevTitle, newTitle }) => {
  return db('titles').where('user', user).andWhere('title', prevTitle).update({ title: newTitle });
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
