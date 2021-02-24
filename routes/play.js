const express = require('express');
const router = express.Router();

const { createPlayController } = require('../controllers/play');

router.post('/', createPlayController);

module.exports = router;
