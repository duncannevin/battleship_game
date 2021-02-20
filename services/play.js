const { Play } = require('../models/play');
const log = require('log4js').getLogger('service:play');

async function createPlay({ boardId, x, y, hit }) {
    const dataValue = await Play.create({ BoardId: boardId, x, y, hit});
    log.debug(`Play created ${dataValue}`);
    return dataValue;
}

module.exports = { createPlay };
