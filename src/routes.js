const express = require('express');
const storageService = require('./services/storage');
const authenticate = require('./middlewares/authentication');

const router = express.Router();

router.post(`/login`, authenticate(storageService), async (req, res) => {
    const { name, password } = req.body;
    console.log([name, password]);
});

module.exports = router;
