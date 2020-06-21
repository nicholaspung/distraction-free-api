const express = require('express');
const router = express.Router();

// For Auth0
const jwtAuthz = require('express-jwt-authz');
const checkJwt = require('../lib/middleware/checkJwt');

// const masterPostsRouter = require('./masterPosts.routes');
const postsRouter = require('./posts.routes');
const titlesRouter = require('./titles.routes');
const usersRouter = require('./users.routes');
const redditRouter = require('./reddit.routes');

// router.use('/api', masterPostsRouter);
router.use('/api', checkJwt, postsRouter);
router.use('/api', checkJwt, jwtAuthz(['update:titles']), titlesRouter);
router.use('/api', checkJwt, usersRouter);
router.use('/', redditRouter);

module.exports = router;
