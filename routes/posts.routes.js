const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts.controller');

router.get('/posts', postsController.getPosts);
router.post('/posts', postsController.insertPost);
router.put('/posts', postsController.updatePost);
router.delete('/posts', postsController.deletePosts);

// Only used during debugging
router.get('/posts-together', postsController.getPostsTogether);
router.delete('/posts/:id', postsController.deletePostById);

module.exports = router;
