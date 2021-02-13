const express = require('express');
const router = express.Router();

const { createGameController, getGameController } = require('../controllers/game');

router.post('/', createGameController);
router.get('/:id', getGameController);

module.exports = router;
