const jwt = require('jsonwebtoken');

const { JWTConfig } = require('../config/config-factory');

async function authenticate(req, res, next) {
    try {
        const token = req.headers['authorization'];

        if (!token) {
            throw new Error('Missing header');
        }

        const bearerRemoved = token.replace('Bearer ', '');

        req.user = jwt.verify(bearerRemoved, JWTConfig.secret);
        next();
    } catch(err) {
        res.status(401).send();
    }
}

module.exports = authenticate;
