const { Router } = require(`express`);
const authenticate = require('../middlewares/authentication');
const generateToken = require('../utils/jwt');

// Маршрут для аутентификации
module.exports = (app, storageService) => {

    const router = new Router();
    app.use(`/`, router);

    router.post(`/login`, authenticate(storageService), async (req, res) => {
    const { name } = req.body;

        res.json({
            token: generateToken({
                name
            })
        });
    });
};
