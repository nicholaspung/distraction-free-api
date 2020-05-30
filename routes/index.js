const express = require('express');
const router = express.Router();

const masterPostsRouter = require('./masterPosts.routes');
const postsRouter = require('./posts.routes');
const titlesRouter = require('./titles.routes');
const usersRouter = require('./users.routes');

router.use('/', masterPostsRouter);
router.use('/', postsRouter);
router.use('/', titlesRouter);
router.use('/', usersRouter);

module.exports = router;
