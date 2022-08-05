// Модуль для исполняемых сообщений от пользователей

const HistoryCommand = require('./commands/history');

class MessagesService {

    constructor(storageService) {
        this._commands = [];
        this.register(new HistoryCommand(storageService));
    }

    // Метод для регистрации новой команды
    register(command) {
        this._commands.push(command);
    }

    // Метод для выполнения входящей команды от пользователя с указанными параметрами
    async process(commandData) {
        const [commandName, ...params] = commandData.split(' ');
        const command = this._commands.find((command) => command.name === commandName);

        if (command) {
            return command.execute(params);
        }
    }
}

module.exports = MessagesService;
