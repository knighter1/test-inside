const jwt = require(`jsonwebtoken`);
const { JWT_ACCESS_SECRET } = require('../../config');
const storageService = require('../services/storage');

module.exports = (req, res, next) => {
    const authorization = req.headers[`authorization`]

    if (! authorization) {
        return res.sendStatus(401);
    }

    const [, token] = authorization.split('Bearer_');

    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, JWT_ACCESS_SECRET, async (err, payload) => {

        if (err) {
            return res.sendStatus(403);
        }

        next();
    })
}
