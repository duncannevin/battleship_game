const {DataTypes, Model} = require('sequelize');
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
            },
            {
                unique: true,
                fields: ['BoardId', 'x', 'y']
            }
        ]
    });

    Play.beforeCreate(play => play.id = uuid());
    Play.beforeCreate(async (play) => {
        play.hit = await updateHit(play);
        play.played = true;
    });
}

module.exports = { Play, initialize };

async function updateHit({ dataValues: { BoardId, x, y } }) {
    const { getBoardById } = require('../services/board');
    const { incrementHits } = require('../services/ship');

    const board = await getBoardById(BoardId);

    if (!board) {
        return;
    }

    return await findHit(board.dataValues, x, y);

    async function findHit({ Ships }, x, y) {
        if (!Ships.length) {
            return false;
        }

        const current = Ships.shift();

        if (current.orientation === 'n') {
            // size = 3
            /// x = 0/0 bow (x, y)
            /// x = 1/0
            /// x = 2/0 stern
            for (let i = current.x; i < (current.x + current.size); i++) {
                if (i === x && current.y === y) {
                    await incrementHits(current.id);
                    return true;
                }
            }
        }

        if (current.orientation === 'e') {
            // size = 3
            /// x = 0/2 stern
            /// x = 0/1
            /// x = 0/0 bow (x,y)
            for (let i = current.y; i > (current.y + current.size); i++) {
                if (i === y && current.x === x) {
                    await incrementHits(current.id);
                    return true;
                }
            }
        }

        if (current.orientation === 's') {
            // size = 3
            /// x = 2/0 stern
            /// x = 1/0
            /// x = 0/0 bow (x,y)
            for (let i = current.x; i > (current.x - current.size); i--) {
                if (i === x && current.y === y ) {
                    await incrementHits(current.id);
                    return true;
                }
            }
        }

        if (current.orientation === 'w') {
            // size = 3
            /// x = 0/0 bow (x,y)
            /// x = 0/1
            /// x = 0/2 stern
            for (let i = current.y; y < (current.y + current.size); i++) {
                if (i === y && current.x === x) {
                    await incrementHits(current.id);
                    return true;
                }
            }
        }

        return findHit({ Ships }, x, y);
    }
}
