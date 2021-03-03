function handleError(req, res, next) {
    const { error } = res;

    if (!error) {
        return next();
    }
    console.log(error);
    if (error.hasOwnProperty('sql')) {
        error.message = 500;
    }

    res.status(error.message).send();
}

module.exports = handleError;
