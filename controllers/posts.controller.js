const postsService = require('../services/posts.service');

const getPosts = async (req, res) => {
  try {
    // somehow get the user, either through body or through Auth0??
    const { user } = req.body;
    const response = await postsService.get(user);
    res.status(200).json({ posts: response });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};

const getPostsTogether = async (req, res) => {
  try {
    const { user } = req.body;
    const filteredPosts = await postsService.getFilteredPosts(user);
    res.status(200).json({ posts: filteredPosts });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};

const insertPost = async (req, res) => {
  try {
    const { title, comments, url, reddit_id, user } = req.body;
    await postsService.insert({ title, comments, url, reddit_id, user });
    res.status(201).json({ message: 'Post added to your list.' });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};

const updatePost = async (req, res) => {
  try {
    const { user, reddit_id, read } = req.body;
    await postsService.update({ user, reddit_id, read });
    res.status(200).json({ message: 'Post has been updated.' });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};

const deletePosts = async (req, res) => {
  try {
    const { date } = req.body;
    await postsService.del(date);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};

const deleteTitleAndPosts = async (req, res) => {
  try {
    const { user, title } = req.body;
    await postsService.delTitleAndPosts({ user, title });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};

// Only used during debugging
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
  updatePost,
  deletePosts,
  deleteTitleAndPosts,
  deletePostById,
};
