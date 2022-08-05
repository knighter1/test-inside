// Модуль команды для запроса истории сообщений

const storageService = require('../storage');

class HistoryCommand {
    
    constructor(storageService) {
        this.name = 'history';
        this._storageService = storageService;
    }
    
    async execute(params) {
        return this._storageService.getHistory(params[0]);
    }
}

module.exports = new HistoryCommand(storageService);
