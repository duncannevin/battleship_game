const express = require('express');
const router = express.Router();

const { generateController, getBoardController } = require('../controllers/board');

router.get('/generate', generateController);
router.get('/:id', getBoardController);

module.exports = router;
