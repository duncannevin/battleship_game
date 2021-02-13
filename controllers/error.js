const log = require('log4js').getLogger('error:controller');

function handleError(error, req, res) {
    if (error.sql) {
        log.debug(`Sql error: ${JSON.stringify(error.original)}`);
        switch (error.original.code) {
            case 'ER_DUP_ENTRY':
                return res.status(409).send();
            default:
                return res.status(400).send();
        }
    }

    if (error.message && error.message === 'Unauthorized') {
        return res.status(401).send();
    }

    log.error(`Internal server error: ${error}`);
    return res.status(500).send();
}

module.exports = {handleError};
