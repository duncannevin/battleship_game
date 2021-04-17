const { createPlay } = require('../services/play');
const { getBoardById } = require('../services/board');
const { sendPlayUpdate } = require('../services/updater');

async function createPlayController(req, res, next) {
    try {
        const play = await createPlay(req.body);
        const board = await getBoardById(play.BoardId);
        await sendPlayUpdate(req.headers['authorization'], board.dataValues.OpponentId, play.dataValues);
        res.status(201).send(play);
    } catch (e) {
        res.error = e;
        next();
    }
}

module.exports = { createPlayController };
