const { createShip } = require('../services/ship');
const { getBoardById } = require('../services/board');
const { handleError } = require('./error');

async function createShipController(req, res) {
    try {
        if (!req.body.boardId || !req.body.x || !req.body.y || !req.body.orientation || !req.body.size) {
            throw new Error('Bad request');
        }

        const board = await getBoardById(req.body.boardId);

        if (!board) {
            res.status(404).send(`No board by id ${req.body.boardId}`);
        }

        const ship = await createShip(req.body);

        res.status(201).send(ship);
    } catch (e) {
        console.log(e);
        handleError(e, req, res);
    }
}

module.exports = { createShipController };
