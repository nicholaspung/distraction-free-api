const db = require('../data/config');
const FuzzySearch = require('fuzzy-search');
const usersService = require('./users.service');
const titlesService = require('./titles.service');
const masterPostsService = require('./masterPosts.service');
const uniqueArrOfObj = require('../lib/utils/uniqueArrOfObj');

const get = (user) => {
  return db('posts').where('user', user).andWhere('read', false);
};

// Not Scalable
// Currently has duplicate titles
const getFilteredPosts = async (user) => {
  const titles = await titlesService.get(user);
  const masterPosts = await masterPostsService.get();
  const titlesArray = titles.map((item) => item.title);
  const masterPostsArray = masterPosts.flatMap((item) =>
    JSON.parse(item.reddit_posts)
  );
  const redditPosts = uniqueArrOfObj(masterPostsArray, 'reddit_id');
  const searcher = new FuzzySearch(redditPosts, ['title']);

  let filteredPosts = [];
  titlesArray.forEach((title) => {
    const result = searcher.search(title);
    filteredPosts.push(
      result.map((post) => {
        post.search_title = title;
        return post;
      })
    );
  });
  let filteredPostsWithUser = filteredPosts.flat().map((post) => {
    post.user = user;
    return post;
  });

  async function insertPostsIntoDb(posts) {
    const results = [];
    posts.forEach(
      ({ title, comments, url, reddit_id, user, search_title, created_at }) => {
        results.push(
          insert({
            title,
            comments,
            url,
            reddit_id,
            user,
            read: false,
            created_at: created_at || new Date(),
            search_title,
          })
        );
      }
    );
    return await Promise.all(results);
  }

  await insertPostsIntoDb(filteredPostsWithUser);

  await usersService.updateLastQueried(user);

  return get(user);
};

const insert = ({
  title,
  comments,
  url,
  reddit_id,
  user,
  search_title,
  created_at,
  read,
}) => {
  return db('posts').insert({
    title: title,
    comments: comments,
    url: url,
    reddit_id: reddit_id,
    user: user,
    read: read || false,
    created_at: created_at || new Date(),
    search_title: search_title,
  });
};

const update = ({ user, reddit_id, read }) => {
  return db('posts')
    .where('user', user)
    .where('reddit_id', reddit_id)
    .update({ read: read });
};

const del = (date) => {
  return db('posts')
    .where('created_at', '<', date)
    .andWhere('read', true)
    .del();
};

const delTitleAndPosts = ({ user, title }) => {
  return db.transaction(async (trx) => {
    await titlesService.del({ user, title }).transacting(trx);
    await db('posts').where('search_title', title).del().transacting(trx);
  });
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
  delTitleAndPosts,
  delId,
};
