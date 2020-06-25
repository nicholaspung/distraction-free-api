const titlesService = require('../services/titles.service');

const getTitles = async (req, res) => {
  try {
    const { sub: user } = req.user;
    const response = await titlesService.getSorted(user);
    res.status(200).json({ titles: response });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};

const insertTitle = async (req, res) => {
  try {
    const { title } = req.body;
    const { sub: user } = req.user;
    await titlesService.insert({ user, title });
    res.status(201).json({ message: 'Title added to your list.' });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};

const deleteTitle = async (req, res) => {
  try {
    const { title } = req.params;
    const { sub: user } = req.user;
    await titlesService.del({ user, title });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};

/* Only used during debugging */
const updateTitle = async (req, res) => {
  try {
    const { id, title } = req.body;
    const { sub: user } = req.user;
    await titlesService.update({ user, id, title });
    res.status(200).json({ message: 'Title has been updated.' });
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
