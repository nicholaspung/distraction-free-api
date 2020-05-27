const db = require('../data/config');
const FuzzySearch = require('fuzzy-search');

const get = (user) => {
  return db('posts').where('user', user);
};

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
  console.log(filteredPosts);
  let filteredPostsWithUser = filteredPosts.flat().map((post) => (post.user = user));
  console.log(filteredPostsWithUser);
  // async function insertPostsIntoDb(posts) {
  //   const results = [];
  //   posts.forEach(({ title, comments, url, reddit_id, user }) => {
  //     results.push(insert({ title, comments, url, reddit_id, user }));
  //   });
  //   return await Promise.all(results);
  // }
  // await insertPostsIntoDb(filteredPosts);
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
