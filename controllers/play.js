const { createPlay } = require('../services/play');
const { handleError } = require('../middlewares/error');

async function createPlayController(req, res, next) {
    try {
        const play = await createPlay({ ...req.body });

        res.status(201).send(play);
    } catch (e) {
        res.error = e;
        next();
    }
}

module.exports = { createPlayController };
