const express = require('express');
const router = express.Router();

const { generateController } = require('../controllers/board');

router.get('/generate', generateController);

module.exports = router;
