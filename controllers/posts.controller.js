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

module.exports = {
  insertPost,
  getPosts,
};
