const { createBoard, getBoardById } = require('../services/board');
const { handleError } = require('./error');

async function generateController(req, res) {
    try {
        const { id } = req.user;
        const board = await createBoard(id);
        res.status(201).send(board);
    } catch (e) {
        handleError(e, req, res);
    }
}

async function getBoardController(req, res) {
    try {
        const id = req.params['id'];
        const board = await getBoardById(id);

        if (!board) {
            throw new Error('Not found');
        }

        res.send(board);
    } catch (e) {
        handleError(e, req, res);
    }
}

module.exports = { generateController, getBoardController };
