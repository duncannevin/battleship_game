const {DataTypes, Model} = require('sequelize');
const db = require('../database');
const log = require('log4js').getLogger('db:user');
const { v4: uuid } = require('uuid');

const Board = require('./board');

class Play extends Model {}

Play.init({
    id: {
        primaryKey: true,
        unique: true,
        type: DataTypes.UUID
    },
    x: {
        type: DataTypes.INTEGER
    },
    y: {
        type: DataTypes.INTEGER
    },
    played: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    hit: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    sequelize: db,
    modelName: 'Play',
    timestamps: true,
    updatedAt: true,
    indexes: [
        {
            unique: true,
            fields: ['id']
        }
    ]
});

Play.belongsTo(Board);
Play.beforeCreate(play => play.id = uuid());

syncPlay();

async function syncPlay() {
    try {
        await Play.sync();
        log.debug('Play model synced');
    } catch (e) {
        log.error(`Play model failed to sync: ${e}`);
        process.exit(1);
    }
}

module.exports = Play;
