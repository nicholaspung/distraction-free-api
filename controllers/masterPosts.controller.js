const masterPostsService = require('../services/masterPosts.service.js');

const getPosts = async (req, res) => {
  try {
    const response = await masterPostsService.get();
    res.status(200).json({ masterPosts: response });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};

const insertPosts = async (req, res) => {
  try {
    const { reddit_posts } = req.body;
    await masterPostsService.insert(reddit_posts);
    res.status(201).send({ message: 'Master posts has been updated.' });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.body;
    await masterPostsService.delPost(id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};

module.exports = {
  getPosts,
  insertPosts,
  deletePost,
};
