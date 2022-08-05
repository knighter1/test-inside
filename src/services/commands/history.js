// Модуль команды для запроса истории сообщений

class HistoryCommand {
    
    constructor(storageService) {
        this.name = 'history';
        this._storageService = storageService;
    }
    
    async execute(params) {
        return this._storageService.getHistory(params[0]);
    }
}

module.exports = HistoryCommand;
