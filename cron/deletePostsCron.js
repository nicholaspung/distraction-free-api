const CronJob = require('cron').CronJob;

// Pings on every 7th day of month
const deletePostsCronJob = (db) => {
  return new CronJob(
    '0 * * * * *', // every minute
    // "0 0 */7 * * *",
    async () => {
      const cutoff = Date.parse(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
      try {
        await db('master_posts').where('date', '<', cutoff).del();
        await db('posts').where('date', '<', cutoff).del();
        console.log('You will see this message on every minute.');
      } catch (err) {
        console.log(err);
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
