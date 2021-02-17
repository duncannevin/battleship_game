const { Op } = require('sequelize');
const { Game } = require('../database');
const log = require('log4js').getLogger('service:game');

async function createGame(board1Id, board2Id) {
    const { dataValues } = await Game.create({ board1Id: board1Id, board2Id: board2Id });
    log.debug(`Game created: ${dataValues.id}, b1: ${board1Id}, b2: ${board2Id}`);
    return dataValues;
}

async function getGameByBoardIds(board1Id, board2Id) {
    const game = await Game.findOne({
        where: {
            [Op.and]: [
                {
                    board1Id
                },
                {
                    board2Id
                }
            ]
        }
    });
    log.debug(`Game found by board ids: b1 ${board1Id}, b2 ${board2Id}`);
    return game;
}

async function getGameById(gameId) {
    const game = await Game.findByPk(gameId);
    log.debug(`Game found by id: ${gameId}`);
    return game;
}

module.exports = { createGame, getGameByBoardIds, getGameById };
