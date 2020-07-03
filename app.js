require('dotenv').config();
const app = require('./server');

// Cron Jobs
// const { redditCronJob } = require('./lib/cron/redditCron');
// const { deletePostsCronJob } = require('./lib/cron/deletePostsCron');
// redditCronJob().start();
// deletePostsCronJob().start();

const axios = require('axios');
const cheerio = require('cheerio');

axios.get('https://reaperscans.com/home').then((res) => {
  const $ = cheerio.load(res.data);
  const mediaContent = $('.media-content');
  const result = [];
  for (let i = 0; i < 8; i += 1) {
    result.push(mediaContent[i].attribs.href);
  }
  console.log(result);
});

axios.get('https://leviatanscans.com/home').then((res) => {
  const $ = cheerio.load(res.data);
  const mediaContent = $('.media-content');
  const result = [];
  for (let i = 0; i < 8; i += 1) {
    result.push(mediaContent[i].attribs.href);
  }
  console.log(result);
});

axios.get('https://zeroscans.com/home').then((res) => {
  const $ = cheerio.load(res.data);
  const mediaContent = $('.media-content');
  const result = [];
  for (let i = 0; i < 8; i += 1) {
    result.push(mediaContent[i].attribs.href);
  }
  console.log(result);
});

axios.get('https://edelgardescans.com/home').then((res) => {
  const $ = cheerio.load(res.data);
  const mediaContent = $('.media-content');
  const result = [];
  for (let i = 0; i < 8; i += 1) {
    result.push(mediaContent[i].attribs.href);
  }
  console.log(result);
});

axios.get('https://hatigarmscanz.net/home').then((res) => {
  const $ = cheerio.load(res.data);
  const mediaContent = $('.media-content');
  const result = [];
  for (let i = 0; i < 8; i += 1) {
    result.push(mediaContent[i].attribs.href);
  }
  console.log(result);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
