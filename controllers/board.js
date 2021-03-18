const { createBoard, getBoardById, addOpponent } = require('../services/board');
const { ErrorEnum } = require('../enums');

async function createBoardController(req, res, next) {
    try {
        const { id } = req.user;
        const board = await createBoard(id);
        res.status(201).send(board);
    } catch (e) {
        console.log(e);
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

async function addOpponentController(req, res, next) {
    try {
        const { b1Id, b2Id } = req.params;
        console.log(b1Id, b2Id);
        await addOpponent(b1Id, b2Id);
        res.send();
    } catch (e) {
        console.log(e);
        res.error = e;
        next();
    }
}

module.exports = { generateController: createBoardController, getBoardController, addOpponentController };
