const db = require('../data/config');
const FuzzySearch = require('fuzzy-search');
const usersService = require('./users.service');
const titlesService = require('./titles.service');
const masterPostsService = require('./masterPosts.service');
const uniqueArrOfObj = require('../lib/utils/uniqueArrOfObj');

const get = (user) => {
  return db('posts').where('user', user).andWhere('read', false);
};

/**
 * Maybe make this call not be added into database? So the idea would be to get masterPostsService.get(),
 * then titlesService.get(), and filter out the posts that come out from it, and return it without adding
 * to database. Pros: no need to deal with duplicates, Cons: expensive operation if grabbed a bunch of times.
 * Or instead of inserting each post individually, we can add an array of the filtered posts with last_queried
 * field, and update the post array everytime this gets called. Then how is a post updated if it's marked read?
 * Make it a FE operation? That doesn't seem right. Create a new table for posts read and store the reddit id
 * that was marked read? Then on postsService.get(), filter out the reddit id that is marked read? Will the excess
 * reddit ids be deleted on a cron cycle too? On FE, seems like doing a post and get API call is regular, is this
 * okay?
 * # of operations: 1, 2, 3, 4
 * Can use a join for titles and posts read queries?
 * Instead of saving posts to database, can just cache the data on FE and after a certain amount of time has
 * passed, do another API call based on FE? Trying to figure out if it's better for FE to give constraints, or
 * API give constaints? I have a feeling API giving constraints might be better, but it complicates API calls
 * Modify Post table to only need User|RedditId|Read fields
 * Do a join between Post table and Titles table on user XXX since data returned will be odd ------------
 * Do queries for Master Posts, Titles, Post then filter and create data there. Add data to User table as CachedPosts
 * In controllers, add a date body data (default new Date()) to check if we need to update CachedPosts, otherwise
 * do a query for User and return CachedPost. Just kidding, can't be cached because the Post read field will be
 * different very frequently.
 * No need to save the combined data since it'll always trigger a calculation when marking a post as read.
 * # of operations: 3 total
 */
const getFilteredPosts = async (user) => {
  const titles = await titlesService.get(user); // 1
  const masterPosts = await masterPostsService.get(); // 2
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
      ({
        title,
        comments,
        url,
        reddit_id,
        user,
        search_title,
        created_at = new Date(),
        read = false,
      }) => {
        results.push(
          insert({
            title,
            comments,
            url,
            reddit_id,
            user,
            read,
            created_at,
            search_title,
          })
        );
      }
    );
    return await Promise.all(results);
  }

  await insertPostsIntoDb(filteredPostsWithUser); // n

  await usersService.updateLastQueried(user); // 4

  return get(user); // 5
};

const insert = ({
  title,
  comments,
  url,
  reddit_id,
  user,
  search_title,
  created_at = new Date(),
  read = false,
}) => {
  return db('posts').insert({
    title,
    comments,
    url,
    reddit_id,
    user,
    read,
    created_at,
    search_title,
  });
};

const update = ({ user, reddit_id, read }) => {
  return db('posts')
    .where('user', user)
    .where('reddit_id', reddit_id)
    .update({ read });
};

const delTitleAndPosts = ({ user, title }) => {
  return db.transaction(async (trx) => {
    await titlesService.del({ user, title }).transacting(trx);
    await db('posts')
      .where('search_title', title)
      .andWhere('user', user)
      .del()
      .transacting(trx);
  });
};

/* API only */
const del = (date) => {
  return db('posts')
    .where('created_at', '<', date)
    .andWhere('read', true)
    .del();
};

/* Only used during debugging */
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
