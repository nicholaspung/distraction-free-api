const axios = require('axios');
const { URLSearchParams } = require('url');
require('dotenv').config();

const REDDIT_ACCESS_TOKEN_URL = 'https://www.reddit.com/api/v1/access_token';
const APP_ONLY_GRANT_TYPE = 'https://oauth.reddit.com/grants/installed_client';

const get = async () => {
  const { REDDIT_CLIENT_ID } = process.env;

  const params = new URLSearchParams();
  params.append('grant_type', APP_ONLY_GRANT_TYPE);
  params.append('device_id', 'DO_NOT_TRACK_THIS_DEVICE');

  const tokenData = await axios.post(REDDIT_ACCESS_TOKEN_URL);
};

module.exports = {
  get,
};
