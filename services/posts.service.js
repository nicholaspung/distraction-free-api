const db = require('../data/config');

const get = (user) => {
  return db('posts').where('user', user);
};

const getFilteredPosts = async (user) => {
  const titles = await db('titles').where('user', user);
  const masterPosts = await db('master_posts');
};

const insert = ({ title, comments, url, reddit_id, user }) => {
  return db('posts').insert({
    title: title,
    comments: comments,
    url: url,
    reddit_id: reddit_id,
    user: user,
  });
};

const update = ({ user, reddit_id, read }) => {
  return db('posts').where('user', user).where('reddit_id', reddit_id).update({ read: read });
};

const del = (date) => {
  return db('posts').where('created_at', '<', date).andWhere('read', true).del();
};

module.exports = {
  get,
  getFilteredPosts,
  insert,
  update,
  del,
};
