const db = require('../data/config');

const get = () => {
  return db('master_posts');
};

const getFromLastQueried = (date) => {
  return db('master_posts').where('date', '>', date);
};

const insert = (reddit_posts, date) => {
  return db('master_posts').insert({
    reddit_posts: JSON.stringify(reddit_posts),
    date: date || new Date(),
  });
};

const delPost = (id) => {
  return db('master_posts').where('id', id).del();
};

const del = (date) => {
  return db('master_posts').where('date', '<', date).del();
};

module.exports = {
  get,
  getFromLastQueried,
  insert,
  delPost,
  del,
};
