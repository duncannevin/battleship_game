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
    const board = await Board.findByPk(boardId, { include: [ Ship, Play, { model: Board, as: 'Opponent', include: [ Play ] } ]});
    log.debug(`Got board by id: ${JSON.stringify(board)}`);
    return board;
}

async function getBoardsByUserId(userId) {
    const dataValues = await Board.findAll({
        where: { userId },
        include:  [ Ship, Play, { model: Board, as: 'Opponent', include: [ Play ] } ]
    });
    log.debug(`Got boards by userId: ${dataValues}`);
    return dataValues;
}

async function addOpponent(b1Id, b2Id) {
    await Board.update({ OpponentId: b1Id }, { where: { id: b2Id } });
    await Board.update({ OpponentId: b2Id }, { where: { id: b1Id } });
    log.debug(`Opponent ${b1Id} added to ${b2Id}`);
}

async function getAwaitingBoards() {
    return await Board.findAll({
        where: {OpponentId: null}
    });
}

module.exports = { getAwaitingBoards, createBoard, getBoardsByIds, getBoardById, getBoardsByUserId, addOpponent };
