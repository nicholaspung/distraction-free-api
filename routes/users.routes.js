const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');

router.get('/users', usersController.getUser);
router.post('/users', usersController.insertUser);
router.delete('/users', usersController.deleteUser);

module.exports = router;
