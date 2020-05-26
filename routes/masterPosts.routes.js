const express = require('express');
const router = express.Router();
const masterPostsController = require('../controllers/masterPosts.controller');

router.get('/master-posts', masterPostsController.getPosts);
router.post('/master-posts', masterPostsController.insertPosts);
router.delete('/master-posts', masterPostsController.deletePost);

module.exports = router;
