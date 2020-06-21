const express = require('express');
const router = express.Router();
const titlesController = require('../controllers/titles.controller');

router.get('/titles', titlesController.getTitles);
router.put('/titles', titlesController.updateTitle);
router.delete('/titles/:title', titlesController.deleteTitle);

/* Only used during debugging */
router.post('/titles', titlesController.insertTitle);

module.exports = router;
