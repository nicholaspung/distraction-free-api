const db = require('../data/config');
const FuzzySearch = require('fuzzy-search');
const usersService = require('./users.service');
const titlesService = require('./titles.service');
const masterPostsService = require('./masterPosts.service');
const redditPostsService = require('./reddit.service.js');
const uniqueArrOfObj = require('../lib/utils/uniqueArrOfObj');

const insert = ({ user, reddit_id, read, date = new Date() }) => {
  return db('read_posts').insert({ user, reddit_id, read, date });
};

const getFilteredPosts = async (user) => {
  const titles = await titlesService.get(user);
  const masterPosts = await masterPostsService.get();
  const readPosts = await get(user);
  const currentRedditPosts = (
    await redditPostsService.get()
  ).data.data.children.map((post) => ({
    title: post.data.title,
    comments: `https://www.reddit.com${post.data.permalink}`,
    url: post.data.url ? post.data.url : '',
    reddit_id: post.data.id,
  }));
  const titlesArray = titles.map((item) => item.title);
  const masterPostsArray = masterPosts.flatMap((item) =>
    JSON.parse(item.reddit_posts)
  );
  const combinedRedditPosts = masterPostsArray.concat(currentRedditPosts);
  const readPostsArray = readPosts.map((item) => item.reddit_id);
  const redditPosts = uniqueArrOfObj(combinedRedditPosts, 'reddit_id');
  const searcher = new FuzzySearch(redditPosts, ['title']);
  let filteredPosts = [];
  titlesArray.forEach((title) => {
    const result = searcher
      .search(title)
      .filter((post) => !readPostsArray.includes(post.reddit_id));
    filteredPosts.push(result);
  });

  await usersService.updateLastQueried(user);
  return filteredPosts.flatMap((k) => k);
};

/* API only */
const del = ({ user, date }) => {
  return db('read_posts').where('user', user).andWhere('date', '<', date).del();
};

/* Only used during debugging */
const get = (user) => {
  return db('read_posts').where('user', user);
};

const delId = (id) => {
  return db('read_posts').where('id', id).del();
};

module.exports = {
  get,
  insert,
  getFilteredPosts,
  del,
  delId,
};
