const jwt = require(`jsonwebtoken`);
const { JWT_ACCESS_SECRET } = require('../../config');

module.exports = (req, res, next) => {
    const authorization = req.headers[`authorization`]

    if (! authorization) {
        return res.sendStatus(401);
    }

    const [, token] = authorization.split('Bearer_');

    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, JWT_ACCESS_SECRET, (err, payload) => {

        if (err) {
            return res.sendStatus(403);
        }

        next();
    })
}
