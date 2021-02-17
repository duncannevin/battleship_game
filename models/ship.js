const {DataTypes, Model} = require('sequelize');
const log = require('log4js').getLogger('db:user');
const { v4: uuid } = require('uuid');

class Ship extends Model {}

function initialize(db) {
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

    Ship.beforeCreate(ship => ship.id = uuid());
}

module.exports = { Ship, initialize };
