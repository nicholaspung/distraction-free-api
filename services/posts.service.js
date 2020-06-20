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
 */
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
