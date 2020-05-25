const express = require('express');
const router = express.Router();
const titlesController = require('../controllers/titles.controller');

router.get('/titles', titlesController.getTitles);
router.post('/titles', titlesController.insertTitle);
router.put('/titles', titlesController.updateTitle);
router.delete('/titles', titlesController.deleteTitle);

module.exports = router;
