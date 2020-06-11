const axios = require('axios');
require('dotenv').config();

const REDDIT_ACCESS_TOKEN_URL = 'https://www.reddit.com/api/v1/access_token';

const get = async () => {
  const tokenData = await axios.post(REDDIT_ACCESS_TOKEN_URL, {
    body: {
      grant_type: 'password',
      username: process.env.REDDIT_USERNAME,
      password: process.env.REDDIT_PASSWORD,
    },
    auth: {
      username: process.env.REDDIT_CLIENT_ID,
      password: process.env.REDDIT_CLIENT_SECRET,
    },
  });
  console.log(tokenData);
};

module.exports = {
  get,
};
