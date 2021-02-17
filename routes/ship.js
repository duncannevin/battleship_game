const express = require('express');
const router = express.Router();
const { createShipController } = require('../controllers/ship');

router.post('/', createShipController);

module.exports = router;
