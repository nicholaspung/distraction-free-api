const db = require('../data/config');

const insert = (reddit_posts) => {
  return db('master_posts').insert({
    reddit_posts: reddit_posts,
  });
};

const get = () => {
  return db.select('*').from('master_posts');
};

module.exports = {
  insert,
  get,
};
