const {DataTypes, Model} = require('sequelize');
const log = require('log4js').getLogger('db:board');
const { v4: uuid } = require('uuid');

const Play = require('../models/play');
const Ship = require('../models/ship');

class Board extends Model {}

function initialize(db) {
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
}

module.exports = { Board, initialize };
