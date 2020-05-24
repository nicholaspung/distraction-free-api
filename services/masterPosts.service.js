const db = require('../data/config');

const insert = (reddit_posts) => {
  return db('master_posts').insert({
    reddit_posts: reddit_posts,
  });
};

const get = () => {
  return db('master_posts');
};

const del = (date) => {
  return db('master_posts').where('date', '<', date).del();
};

module.exports = {
  insert,
  get,
  del,
};
