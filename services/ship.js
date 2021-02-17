const { Ship } = require('../database');
const log = require('log4js').getLogger('service:ship');

async function createShip({ boardId, orientation, x, y, size }) {
    const dataValue = await Ship.create({ BoardId: boardId, orientation, x, y, size});
    log.debug(`Ship created ${dataValue}`);
    return dataValue;
}

module.exports = { createShip };
