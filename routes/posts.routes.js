const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts.controller');

router.get('/posts', postsController.getPostsTogether);
router.post('/posts', postsController.insertPost);

/* API only */
// router.delete('/posts', postsController.deletePosts);

/* Only used during debugging */
// router.get('/posts', postsController.getPosts);
// router.delete('/posts/:id', postsController.deletePostById);

module.exports = router;
