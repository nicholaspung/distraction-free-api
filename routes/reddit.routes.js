const express = require('express');
const router = express.Router();
const redditController = require('../controllers/reddit.controller');

router.get('/reddit', redditController.getReddit);
router.get('/websites', redditController.getWebsites);

module.exports = router;
