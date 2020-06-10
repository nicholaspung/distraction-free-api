const express = require('express');
const router = express.Router();
const redditController = require('../controllers/reddit.controller');

router.post('/reddit', redditController.getReddit);

module.exports = router;
