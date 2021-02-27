const { createBoard, getBoardById } = require('../services/board');
const { ErrorEnum } = require('../enums');

async function createBoardController(req, res, next) {
    try {
        const { id } = req.user;
        const board = await createBoard(id);
        res.status(201).send(board);
    } catch (e) {
        res.error = e;
        next();
    }
}

async function getBoardController(req, res, next) {
    try {
        const id = req.params['id'];
        const board = await getBoardById(id);

        if (!board) {
            throw new Error(ErrorEnum.NOT_FOUND);
        }

        res.send(board);
    } catch (e) {
        res.error = e;
        next();
    }
}

module.exports = { generateController: createBoardController, getBoardController };
