const {DataTypes, Model} = require('sequelize');
const log = require('log4js').getLogger('db:user');
const { v4: uuid } = require('uuid');

class Play extends Model {}

function initialize(db) {
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

    Play.beforeCreate(play => play.id = uuid());
}

module.exports = { Play, initialize };
