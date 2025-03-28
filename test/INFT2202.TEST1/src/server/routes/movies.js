const express = require('express');
const router = express.Router();
const movieController = require('../controllers/moviesController');

router.get('/', movieController);

module.exports = router;
