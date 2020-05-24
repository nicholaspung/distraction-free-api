const express = require('express');
const router = express.Router();

const masterPostsRouter = require('./masterPosts.routes');
const postsRouter = require('./posts.routes');
const titlesRouter = require('./titles.routes');
const usersRouter = require('./users.routes');

router.use('/api', masterPostsRouter);
router.use('/api', postsRouter);
router.use('/api', titlesRouter);
router.use('/api', usersRouter);

module.exports = router;
