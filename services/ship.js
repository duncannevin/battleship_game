const { Ship } = require('../database');
const log = require('log4js').getLogger('service:ship');

async function createShip({ boardId, orientation, x, y, size }) {
    const dataValue = await Ship.create({ BoardId: boardId, orientation, x, y, size});
    log.debug(`Ship created ${dataValue}`);
    return dataValue;
}

async function incrementHits(shipId) {
    const foo = await Ship.increment({ hits: 1 }, { where: { id: shipId } });
    log.debug(`Ship hits incremented ${foo}`);
    return foo;
}

module.exports = { createShip, incrementHits };
