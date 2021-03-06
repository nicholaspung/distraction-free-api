const CronJob = require('cron').CronJob;
const masterPostsService = require('../../services/masterPosts.service');
const postsService = require('../../services/posts.service');
const { deletePostsLogger } = require('../utils/logger');

// Pings on every 7th day of month
const deletePostsCronJob = () => {
  return new CronJob(
    // '0 * * * * *', // every minute
    '0 0 */7 * * *',
    async () => {
      const cutoff = Date.parse(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
      // const cutoff = Date.parse(new Date(Date.now() - 1000 * 60));
      try {
        await masterPostsService.del(cutoff);
        await postsService.del(cutoff);
        deletePostsLogger.log({
          level: 'info',
          message: `Deleted master_posts and read_posts at ${new Date()}`,
        });
      } catch (err) {
        deletePostsLogger.log({
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
  deletePostsCronJob,
};
