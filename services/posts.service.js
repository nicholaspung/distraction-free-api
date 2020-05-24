const db = require('../data/config');

const insert = ({ title, comments, url, reddit_id, user }) => {
  return db('posts').insert({
    title: title,
    comments: comments,
    url: url,
    reddit_id: reddit_id,
    user: user,
  });
};

module.exports = {
  insert,
};
