// const qs = require('querystring');
const axios = require('axios');
const cheerio = require('cheerio');
// require('dotenv').config();

// const fetchSubreddit = (subreddit, accessToken) => {
//   return axios.get(`https://www.reddit.com/r/${subreddit}/.rss`, {
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//     },
//   });
// };

// const loginToRedditScript = () => {
//   return axios.post(
//     'https://www.reddit.com/api/v1/access_token',
//     qs.stringify({
//       grant_type: 'password',
//       username: process.env.REDDIT_USERNAME,
//       password: process.env.REDDIT_PASSWORD,
//     }),
//     {
//       headers: {
//         Authorization: `Basic ${Buffer.from(
//           `${process.env.REDDIT_CLIENT_ID}:${process.env.REDDIT_CLIENT_SECRET}`
//         ).toString('base64')}`,
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//     }
//   );
// };

const get = async () => {
  // const { data: access_token } = await loginToRedditScript();
  // return await fetchSubreddit('manga', access_token);
  return axios
    .get('https://www.reddit.com/r/manga.json')
    .then((res) => res.data.data.children);
};

const getWebsites = async () => {
  const result = [];
  let $, websiteData, mediaContent;

  websiteData = await axios.get('https://reaperscans.com/home');
  $ = cheerio.load(websiteData.data);
  mediaContent = $('.media-content');
  for (let i = 0; i < 8; i += 1) {
    result.push(mediaContent[i].attribs.href);
  }
  websiteData = await axios.get('https://leviatanscans.com/home');
  $ = cheerio.load(websiteData.data);
  mediaContent = $('.media-content');
  for (let i = 0; i < 8; i += 1) {
    result.push(mediaContent[i].attribs.href);
  }
  websiteData = await axios.get('https://zeroscans.com/home');
  $ = cheerio.load(websiteData.data);
  mediaContent = $('.media-content');
  for (let i = 0; i < 8; i += 1) {
    result.push(mediaContent[i].attribs.href);
  }
  websiteData = await axios.get('https://edelgardescans.com/home');
  $ = cheerio.load(websiteData.data);
  mediaContent = $('.media-content');
  for (let i = 0; i < 8; i += 1) {
    result.push(mediaContent[i].attribs.href);
  }
  websiteData = await axios.get('https://hatigarmscanz.net/home');
  $ = cheerio.load(websiteData.data);
  mediaContent = $('.media-content');
  for (let i = 0; i < 8; i += 1) {
    result.push(mediaContent[i].attribs.href);
  }

  const capitalize = (s) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  return result.map((url) => {
    let title = url.split('/');
    let chapter = title[6];
    title = title[4].split('-');
    return {
      url,
      title: `${title
        .splice(1, title.length - 1)
        .map((word) => capitalize(word))
        .join(' ')} ch. ${chapter}`,
    };
  });
};

module.exports = {
  get,
  getWebsites,
};
