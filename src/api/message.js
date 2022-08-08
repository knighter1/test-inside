const { Router } = require(`express`);
const MessagesService = require('../services/messages');
const authenticateJwt = require('../middlewares/authentication-jwt');

// Маршрут для аутентификации
module.exports = (app, storageService) => {

    const router = new Router();
    app.use(`/`, router);

    const messagesService = new MessagesService(storageService);

    router.post(`/message`, authenticateJwt, async (req, res) => {
    
        const { name, message } = req.body;
        const response = await messagesService.process(message);
    
        const user = await storageService.findUser(name);
    
        if (user)
            storageService.addHistory(user, message);
    
        res.json({
            messages: response
        });
    });
};
