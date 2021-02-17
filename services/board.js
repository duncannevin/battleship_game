const { Op } = require('sequelize');
const { Board, Ship, Play } = require('../database');
const log = require('log4js').getLogger('service:board');

async function createBoard(userId) {
    const { dataValues } = await Board.create(
        { userId },
        { include: [ Play, Ship ] }
    );
    log.debug(`Created board for user ${dataValues.userId}: ${dataValues.id}`)
    return dataValues;
}

async function getBoardsByIds(board1Id, board2Id) {
    const dataValues = await Board.findAll({
        [Op.or] : [
            {
                where: { boardId: board1Id }
            },
            {
                where: { boardId: board2Id }
            }
        ]
    }, {include: [Ship, Play]});
    log.debug(`Got boards by 2 board id's: b1 ${board1Id}, b2 ${board2Id}`);
    return dataValues.map(board => board.dataValues);
}

async function getBoardById(boardId) {
    const dataValues = await Board.findByPk(boardId, { include: [ Ship, Play ]});
    log.debug(`Got board by id: ${dataValues}`);
    return dataValues;
}

async function getBoardsByUserId(userId) {
    const { dataValues } = await Board.findAll({
        where: { userId }
    });
    log.debug(`Got boards by userId: ${dataValues}`);
    return dataValues;
}

module.exports = { createBoard, getBoardsByIds, getBoardById, getBoardsByUserId };
