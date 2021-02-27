function handleError(req, res, next) {
    const { error } = res;

    if (!error) {
        return next();
    }

    res.status(error.message).send();
}

module.exports = handleError;
