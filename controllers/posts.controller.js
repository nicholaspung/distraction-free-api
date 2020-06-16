const postsService = require('../services/posts.service');

const getPosts = async (req, res) => {
  try {
    const { sub: user } = req.user;
    const response = await postsService.get(user);
    res.status(200).json({ posts: response });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};

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
    const { title, comments, url, reddit_id, search_title } = req.body;
    const { sub: user } = req.user;
    await postsService.insert({
      title,
      comments,
      url,
      reddit_id,
      user,
      search_title,
    });
    res.status(201).json({ message: 'Post added to your list.' });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};

const updatePost = async (req, res) => {
  try {
    const { reddit_id, read } = req.body;
    const { sub: user } = req.user;
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
    const { title } = req.body;
    const { sub: user } = req.user;
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
