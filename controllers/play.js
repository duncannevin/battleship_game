const { getBoardById } = require('../services/board');
const { createPlay } = require('../services/play');
const { handleError } = require('./error');

async function createPlayController(req, res) {
    try {
        const hit = await detectHit(req.body);
        const play = await createPlay({ ...req.body, hit });

        res.status(201).send(play);
    } catch (e) {
        handleError(e, req, res);
    }
}

module.exports = { createPlayController };

async function detectHit({ boardId, x, y }) {
    const { Ships } = await getBoardById(boardId);
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
