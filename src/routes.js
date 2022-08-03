const express = require('express');
const storageService = require('./services/storage');
const messagesService = require('./services/messages');
const authenticate = require('./middlewares/authentication');
const authenticateJwt = require('./middlewares/authentication-jwt');
const generateToken = require('./utils/jwt');

const router = express.Router();

router.post(`/login`, authenticate(storageService), async (req, res) => {
    const { name } = req.body;

    res.json({
        token: generateToken({
            name
        })
    });
});

router.get(`/message`, authenticateJwt, async (req, res) => {
    
    const response = await messagesService.process(req.query.message);

    res.json({
        message: response
    });
});

module.exports = router;
