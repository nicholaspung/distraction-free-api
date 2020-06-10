const redditService = require('../services/reddit.service');

const getReddit = async (req, res) => {
  try {
    const response = await redditService.get();
    res.status(200).json({ reddit_posts: response });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};

module.exports = { getReddit };
