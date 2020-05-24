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

const get = (user) => {
  return db('posts').where('user', user);
};

const del = (date) => {
  return db('posts').where('created_at', '<', date).andWhere('read', true).del();
};

const update = ({ user, reddit_id, read }) => {
  return db('posts').where('user', user).where('reddit_id', reddit_id).update({ read: read });
};

module.exports = {
  insert,
  get,
  del,
  update,
};
