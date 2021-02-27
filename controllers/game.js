const { createGame, getGameByBoardIds, getGameById } = require('../services/game');
const { getBoardsByIds } = require('../services/board');
const { ErrorEnum } = require('../enums');

async function createGameController(req, res, next) {
    try {
        const boards = await getBoardsByIds(req.body.board1Id, req.body.board2Id);

        if (boards.length < 2) {
            throw new Error(ErrorEnum.NOT_FOUND);
        }

        let game = await getGameByBoardIds(req.body.board1Id, req.body.board2Id);
        let status = 200;

        if (!game) {
            game = await createGame(req.body.board1Id, req.body.board2Id);
            status = 201;
        }

        res.status(status).send(game);
    } catch (e) {
        res.error = e;
        next();
    }
}

async function getGameController(req, res, next) {
    try {
        const id = req.params['id'];
        const board = await getGameById(id);

        if (board) {
            res.send(board);
        }

        res.status(404).send();
    } catch (e) {
        res.error = e;
        next();
    }
}

module.exports = { createGameController, getGameController };
