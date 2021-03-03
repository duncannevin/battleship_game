const { Play } = require('../models/play');
const log = require('log4js').getLogger('service:play');

async function createPlay({ BoardId, x, y }) {
    const dataValue = await Play.create({ BoardId, x, y });
    log.debug(`Play created ${dataValue}`);
    return dataValue;
}

module.exports = { createPlay };
