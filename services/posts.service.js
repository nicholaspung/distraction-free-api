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
  const titlesArray = (await titlesService.get(user)).map((item) => item.title);
  const masterPostsArray = (await masterPostsService.get()).flatMap((item) =>
    JSON.parse(item.reddit_posts)
  );
  const readPostsArray = (await get(user)).map((item) => item.reddit_id);
  const currentRedditPosts = (await redditPostsService.get()).map((post) => ({
    title: post.data.title,
    comments: `https://www.reddit.com${post.data.permalink}`,
    url: post.data.url ? post.data.url : '',
    reddit_id: post.data.id,
  }));
  const combinedRedditPosts = masterPostsArray.concat(currentRedditPosts);
  const redditPosts = uniqueArrOfObj(combinedRedditPosts, 'reddit_id');
  const searcher = new FuzzySearch(redditPosts, ['title']);
  let filteredPosts = [];
  titlesArray.forEach((title) => {
    const result = searcher
      .search(title)
      .filter((post) => !readPostsArray.includes(post.reddit_id));
    filteredPosts.push(result);
  });
  const uniqueStore = {};
  filteredPosts = filteredPosts
    .flat()
    .map((k) => {
      if (!uniqueStore[k.reddit_id]) {
        uniqueStore[k.reddit_id] = true;
        return k;
      }
    })
    .filter((k) => k);

  await usersService.updateLastQueried(user);
  return filteredPosts;
};

/* API only */
const del = (date) => {
  return db('read_posts').where('date', '<', date).andWhere('read', true).del();
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
