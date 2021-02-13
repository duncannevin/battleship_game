const {DataTypes, Model} = require('sequelize');
const db = require('../database');
const log = require('log4js').getLogger('db:user');
const { v4: uuid } = require('uuid');

const Board = require('./board');

class Ship extends Model {}

Ship.init({
    id: {
        primaryKey: true,
        unique: true,
        type: DataTypes.UUID
    },
    x: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    y: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    orientation: {
        type: DataTypes.CHAR,
        validate: {
            isIn: [['n', 'e', 's', 'w']]
        }
    },
    size: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 2,
            max: 5
        }
    },
    hits: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    sequelize: db,
    modelName: 'Ship',
    timestamps: true,
    updatedAt: true,
    indexes: [
        {
            unique: true,
            fields: ['id']
        }
    ]
});

Ship.belongsTo(Board);
Ship.beforeCreate(ship => ship.id = uuid());

syncShip();

async function syncShip() {
    try {
        await Ship.sync();
        log.debug('Ship model synced');
    } catch (e) {
        log.error(`Ship model failed to sync: ${e}`);
        process.exit(1);
    }
}

module.exports = Ship;
