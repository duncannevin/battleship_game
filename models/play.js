const {DataTypes, Model} = require('sequelize');
const { v4: uuid } = require('uuid');
const { getBoardById } = require('../services/board');

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
    Play.beforeCreate(play => {
        play.hit = detectHit(play);
    });
}

module.exports = { Play, initialize };

async function detectHit({ BoardId, x, y }) {
    const { Ships } = await getBoardById(BoardId);
    return findHit(Ships, x, y);

    function findHit(ships, x, y) {
        if (!ships.length) {
            return false;
        }

        const current = ships.shift();

        if (current.orientation === 'n') {
            // size = 3
            /// x = 0/0 bow (x, y)
            /// x = 1/0
            /// x = 2/0 stern
            for (let i = current.x; i <= (current.x + current.size); i++) {
                if (i === x && current.y === y) {
                    return true;
                }
            }
        }

        if (current.orientation === 'e') {
            // size = 3
            /// x = 0/2 stern
            /// x = 0/1
            /// x = 0/0 bow (x,y)
            for (let i = current.y; i >= (current.y + current.size); i++) {
                if (i === y && current.x === x) {
                    return true;
                }
            }
        }

        if (current.orientation === 's') {
            // size = 3
            /// x = 2/0 stern
            /// x = 1/0
            /// x = 0/0 bow (x,y)
            for (let i = current.x; i >= (current.x - current.size); i--) {
                if (i === x && current.y === y ) {
                    return true;
                }
            }
        }

        if (current.orientation === 'w') {
            // size = 3
            /// x = 0/0 bow (x,y)
            /// x = 0/1
            /// x = 0/2 stern
            for (let i = current.y; y <= (current.y + current.size); i++) {
                if (i === y && current.x === x) {
                    return true;
                }
            }
        }

        return findHit(ships, x, y);
    }
}
