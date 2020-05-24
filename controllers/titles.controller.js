const titlesService = require('../services/titles.service');

const insertTitle = async (req, res) => {
  try {
    const { user, title } = req.body;
    await titlesService.insert({ user, title });
    res.status(201).json({ message: 'Title added to your list.' });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};

module.exports = {
  insertTitle,
};
