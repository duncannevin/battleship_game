const { createShip } = require('../services/ship');
const { getBoardById } = require('../services/board');
const { ErrorEnum } = require('../enums');

async function createShipController(req, res, next) {
    try {
        if (!req.body.boardId || !req.body.x || !req.body.y || !req.body.orientation || !req.body.size) {
            throw new Error(ErrorEnum.BAD_REQUEST);
        }

        const board = await getBoardById(req.body.boardId);

        if (!board) {
            throw new Error(ErrorEnum.NOT_FOUND)
        }

        const ship = await createShip(req.body);

        res.status(201).send(ship);
    } catch (e) {
        res.error = e;
        next();
    }
}

module.exports = { createShipController };
