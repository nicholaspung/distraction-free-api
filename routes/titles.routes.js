const express = require('express');
const router = express.Router();
const titlesController = require('../controllers/titles.controller');

router.post('/titles', titlesController.insertTitle);

module.exports = router;
