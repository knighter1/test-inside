// Модуль для генерации JWT

const jwt = require(`jsonwebtoken`);
const { JWT_ACCESS_SECRET } = require('../../config');

module.exports = (tokenData) => {
    const accessToken = jwt.sign(tokenData, JWT_ACCESS_SECRET, { expiresIn: '10m' });
    return accessToken;
};
