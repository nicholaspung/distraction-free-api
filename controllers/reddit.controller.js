const redditService = require('../services/reddit.service');

const getReddit = async (req, res) => {
  try {
    const response = await redditService.get();
    res.status(200).json({ data: response.data.data.children });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};

module.exports = { getReddit };
