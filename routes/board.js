const express = require('express');
const router = express.Router();

const { generateController, getBoardController, addOpponentController, getBoardsController, getAwaitingController } = require('../controllers/board');

router.get('/generate', generateController);
router.get('/:id', getBoardController);
router.get('/', getBoardsController);
router.get('/awaiting', getAwaitingController);
router.put('/opponent/:b1Id/:b2Id', addOpponentController);

module.exports = router;
