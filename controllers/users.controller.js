const usersService = require('../services/users.service');

const getUser = async (req, res) => {
  try {
    const { user } = req.body;
    const response = await usersService.get(user);
    res.status(200).json({ user: response });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};

const insertUser = async (req, res) => {
  try {
    const { user } = req.body;
    await usersService.insert(user);
    res.status(201).json({ message: 'User has been created.' });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { user } = req.body;
    await usersService.del(user);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};

module.exports = {
  getUser,
  insertUser,
  deleteUser,
};
