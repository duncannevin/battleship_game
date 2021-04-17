const { post } = require('axios');
const { UpdaterConfig } = require('../config/config-factory');
const logger = require('log4js').getLogger('service:updater');

class Update {
    constructor(kind, boardId, data) {
        this.kind = kind;
        this.boardId = boardId;
        this.data = data;
    }
}

class PlayUpdate extends Update{
    constructor(boardId, play) {
        super('play', boardId, play);
    }
}

class OpponentUpdate extends Update {
    constructor(opponentObj) {
        super('opponent', opponentObj.BoardId, opponentObj);
    }
}

async function sendPlayUpdate(authToken, boardId, play) {
    return await sendUpdate(authToken, new PlayUpdate(boardId, play));
}

async function sendOpponentUpdate(authToken, opponentObj) {
    return await sendUpdate(authToken, new OpponentUpdate(opponentObj));
}

async function sendUpdate(authToken, updateObj) {
    const location = `${UpdaterConfig.location}/update/${updateObj.boardId}`;

    try {
        return await post(location, updateObj, {
            headers: {
                'Authorization': authToken
            }
        });
    } catch (e) {
        logger.error(`failed: ${e.message}`);
    }
}

module.exports = { sendPlayUpdate, sendOpponentUpdate };
