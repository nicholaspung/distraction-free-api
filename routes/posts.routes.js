const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts.controller');

router.get('/posts', postsController.getPosts);
router.get('/posts-together', postsController.getPostsTogether);
router.post('/posts', postsController.insertPost);
router.put('/posts', postsController.updatePost);
router.delete('/posts', postsController.deletePosts);

module.exports = router;
