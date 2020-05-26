const db = require('../data/config');

const get = () => {
  return db('master_posts');
};

const insert = (reddit_posts) => {
  return db('master_posts').insert({
    reddit_posts: reddit_posts,
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
  insert,
  delPost,
  del,
};
