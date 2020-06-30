const postsService = require('../services/posts.service');

const getPostsTogether = async (req, res) => {
  try {
    const { sub: user } = req.user;
    const filteredPosts = await postsService.getFilteredPosts(user);
    res.status(200).json({ posts: filteredPosts });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};

const insertPost = async (req, res) => {
  try {
    const { reddit_id, read } = req.body;
    const { sub: user } = req.user;
    await postsService.insert({
      reddit_id,
      user,
      read,
    });
    res.status(201).json({ message: 'Post added to your list.' });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};

/* API only */
const deletePosts = async (req, res) => {
  try {
    const { date } = req.body;
    await postsService.del(date);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};

/* Only used during debugging */
const getPosts = async (req, res) => {
  try {
    const { sub: user } = req.user;
    const response = await postsService.get(user);
    res.status(200).json({ posts: response });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};

const deletePostById = async (req, res) => {
  try {
    const { id } = req.params;
    await postsService.delId(parseInt(id));
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};

module.exports = {
  getPosts,
  getPostsTogether,
  insertPost,
  deletePosts,
  deletePostById,
};
