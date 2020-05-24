const express = require('express');
const router = express.Router();
const masterPostsController = require('../controllers/masterPosts.controller');

router.post('/master-posts', masterPostsController.insertPost);
router.get('/master-posts', masterPostsController.getPosts);

module.exports = router;
