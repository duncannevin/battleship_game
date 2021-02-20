const { createPlay } = require('../services/play');
const { handleError } = require('./error');

async function createPlayController(req, res) {
    try {
        const play = await createPlay({ ...req.body });

        res.status(201).send(play);
    } catch (e) {
        handleError(e, req, res);
    }
}

module.exports = { createPlayController };
