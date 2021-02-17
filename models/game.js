const {DataTypes, Model} = require('sequelize');
const log = require('log4js').getLogger('db:board');
const { v4: uuid } = require('uuid');

class Game extends Model {}

function initialize(db) {
    Game.init({
        id: {
            primaryKey: true,
            unique: true,
            type: DataTypes.UUID
        },
        board1Id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        board2Id: {
            type: DataTypes.UUID,
            allowNull: false
        }
    }, {
        sequelize: db,
        modelName: 'Game',
        timestamps: true,
        createdAt: true,
        updatedAt: true,
        indexes: [
            {
                unique: true,
                fields: ['id']
            }
        ]
    });

    Game.beforeCreate(game => game.id = uuid());
}

module.exports = { Game, initialize };
