const {DataTypes, Model} = require('sequelize');
const { v4: uuid } = require('uuid');

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
