require('dotenv').config();
const app = require('./server');

// Cron Jobs
const { redditCronJob } = require('./lib/cron/redditCron');
const { deletePostsCronJob } = require('./lib/cron/deletePostsCron');
redditCronJob().start();
deletePostsCronJob().start();

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
