const usersService = require('../services/users.service');

const insertUser = async (req, res) => {
  try {
    const { user } = req.body;
    await usersService.insertUser({ user });
    res.status(201).json({ message: 'User has been created.' });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};

module.exports = {
  insertUser,
};
