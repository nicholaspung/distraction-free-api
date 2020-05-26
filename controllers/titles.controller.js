const titlesService = require('../services/titles.service');

const getTitles = async (req, res) => {
  try {
    // somehow get the user, either through body or through Auth0??
    const { user } = req.body;
    const response = await titlesService.get(user);
    res.status(200).json({ titles: response });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};

const insertTitle = async (req, res) => {
  try {
    const { user, title } = req.body;
    await titlesService.insert({ user, title });
    res.status(201).json({ message: 'Title added to your list.' });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};

const updateTitle = async (req, res) => {
  try {
    const { user, prevTitle, newTitle } = req.body;
    await titlesService.update({ user, prevTitle, newTitle });
    res.status(200).json({ message: 'Title has been updated.' });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};

const deleteTitle = async (req, res) => {
  try {
    const { user, title } = req.body;
    await titlesService.del({ user, title });
    res.status(204);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};

module.exports = {
  getTitles,
  insertTitle,
  updateTitle,
  deleteTitle,
};
