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

testConnection();

module.exports = db;
