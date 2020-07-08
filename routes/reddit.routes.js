const express = require('express');
const router = express.Router();
const redditController = require('../controllers/reddit.controller');

router.get('/reddit', redditController.getReddit);
router.get('/websites', redditController.getWebsites);
router.get('/website', redditController.getWebsite);

module.exports = router;
