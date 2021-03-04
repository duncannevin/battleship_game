const logger = require('log4js').getLogger('middleware:error');

function handleError(req, res, next) {
    const { error } = res;

    if (!error) {
        return next();
    }

    if (error.hasOwnProperty('sql')) {
        logger.info(error);
        error.message = 400;
    }

    res.status(error.message).send();
}

module.exports = handleError;
