// Модуль для исполняемых сообщений от пользователей

const historyCommand = require('./commands/history');

class MessagesService {

    constructor() {
        this._commands = [];
        this.register(historyCommand);
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

module.exports = new MessagesService();
