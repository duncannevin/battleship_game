const { Sequelize } = require('sequelize');
const { DBConfig } = require('../config/config-factory');
const log = require('log4js').getLogger('db');

const db = new Sequelize(
    DBConfig.name,
    DBConfig.user,
    DBConfig.password,
    {
        host: DBConfig.host,
        dialect: 'mysql',
        logging: msg => log.debug(msg)
    }
);

testConnection();

const modelInitializers = [
    require('../models/board').initialize,
    require('../models/play').initialize,
    require('../models/ship').initialize,
];

modelInitializers.forEach((init) => init(db));

require('../models/relations')(db.models);

db.sync({ force: DBConfig.forceSync });

module.exports = db.models;

async function testConnection() {
    try {
        await db.authenticate();
        log.debug(`DB connected a..okay`);
    } catch (e) {
        await db.close();
        log.error(`DB not running`);
        process.exit(1);
    }
}

