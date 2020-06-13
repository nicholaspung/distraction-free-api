// const qs = require('querystring');
const axios = require('axios');
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
  return axios.get('https://www.reddit.com/r/manga.json');
};

module.exports = {
  get,
};
