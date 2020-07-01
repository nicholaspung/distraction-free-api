const CronJob = require('cron').CronJob;
const axios = require('axios').default;
const masterPostsService = require('../../services/masterPosts.service');
const { redditLogger } = require('../utils/logger');

const mangaLink = 'https://www.reddit.com';

// Pings every on every 15th minute of every hour
const redditCronJob = () => {
  return new CronJob(
    // '*/15 * * * * *', // every 15 seconds
    '0 */15 * * * *',
    async () => {
      try {
        const redditPosts = await axios
          .get(`${mangaLink}/r/manga.json`)
          .then((res) => {
            const posts = res.data.data.children;
            const info = posts.map((post) => ({
              title: post.data.title,
              comments: `${mangaLink}${post.data.permalink}`,
              url: post.data.url ? post.data.url : '',
              reddit_id: post.data.id,
            }));
            return info;
          });
        await masterPostsService.insert(redditPosts);
        redditLogger.log({
          level: 'info',
          message: `Added new reddit posts at ${new Date()}`,
        });
      } catch (err) {
        redditLogger.log({
          level: 'error',
          message: err,
        });
      }
    },
    null,
    true,
    'America/Los_Angeles'
  );
};

module.exports = {
  redditCronJob,
};
