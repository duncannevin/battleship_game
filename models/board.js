const {DataTypes, Model} = require('sequelize');
const db = require('../database');
const log = require('log4js').getLogger('db:board');
const { v4: uuid } = require('uuid');

const Play = require('./play');
const Ship = require('./ship');

class Board extends Model {}

Board.init({
    id: {
        primaryKey: true,
        unique: true,
        type: DataTypes.UUID
    },
    userId: {
        allowNull: false,
        type: DataTypes.UUID
    },
    width: {
        type: DataTypes.INTEGER,
        defaultValue: 10
    },
    height: {
        type: DataTypes.INTEGER,
        defaultValue: 10
    }
}, {
    sequelize: db,
    modelName: 'Board',
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    indexes: [
        {
            unique: true,
            fields: ['id']
        },
        {
            unique: false,
            fields: ['userId']
        }
    ]
});

Board.beforeCreate(board => board.id = uuid());

Board.Plays = Board.hasMany(Play);
Board.Ships = Board.hasMany(Ship);

syncBoard();

async function syncBoard() {
    try {
        await Board.sync();
        log.debug('Board model synced');
    } catch (e) {
        log.error(`Board model failed to sync: ${e}`);
        process.exit(1);
    }
}

module.exports = Board;
