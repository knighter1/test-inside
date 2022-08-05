const { Router } = require('express');
const login = require('./login');
const message = require('./message');
const storageService = require('../services/storage');

const app = new Router();
  
(() => {
    login(app, storageService);
    message(app, storageService);
})();

module.exports = app;
