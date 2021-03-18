const express = require('express');
const router = express.Router();

const { generateController, getBoardController, addOpponentController } = require('../controllers/board');

router.get('/generate', generateController);
router.get('/:id', getBoardController);
router.put('/opponent/:b1Id/:b2Id', addOpponentController);

module.exports = router;
