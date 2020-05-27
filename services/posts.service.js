const db = require('../data/config');
const FuzzySearch = require('fuzzy-search');

const get = (user) => {
  return db('posts').where('user', user);
};

// Not Scalable
const getFilteredPosts = async (user) => {
  const titles = await db('titles').where('user', user);
  const masterPosts = await db('master_posts');
  const titlesArray = titles.map((item) => item.title);
  const redditPosts = JSON.parse(masterPosts.map((item) => item.reddit_posts));
  const searcher = new FuzzySearch(redditPosts, ['title']);

  let filteredPosts = [];
  titlesArray.forEach((title) => {
    const result = searcher.search(title);
    filteredPosts.push(result);
  });
  let filteredPostsWithUser = filteredPosts.flat().map((post) => {
    post.user = user;
    return post;
  });

  async function insertPostsIntoDb(posts) {
    const results = [];
    posts.forEach(({ title, comments, url, reddit_id, user }) => {
      results.push(
        insert({ title, comments, url, reddit_id, user, read: false, created_at: new Date() })
      );
    });
    return await Promise.all(results);
  }

  await insertPostsIntoDb(filteredPostsWithUser);
};

const insert = ({ title, comments, url, reddit_id, user }) => {
  return db('posts').insert({
    title: title,
    comments: comments,
    url: url,
    reddit_id: reddit_id,
    user: user,
    read: false,
    created_at: new Date(),
  });
};

const update = ({ user, reddit_id, read }) => {
  return db('posts').where('user', user).where('reddit_id', reddit_id).update({ read: read });
};

const del = (date) => {
  return db('posts').where('created_at', '<', date).andWhere('read', true).del();
};

// Only used during debugging
const delId = (id) => {
  return db('posts').where('id', id).del();
};

module.exports = {
  get,
  getFilteredPosts,
  insert,
  update,
  del,
  delId,
};
