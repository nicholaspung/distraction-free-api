const postsService = require('../services/posts.service');

const insertPost = async (req, res) => {
  try {
    const { title, comments, url, reddit_id, user } = req.body;
    await postsService.insertPost({ title, comments, url, reddit_id, user });
    res.status(201).json({ message: 'Post added to your list.' });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};

module.exports = {
  insertPost,
};
