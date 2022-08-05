const historyCommand = require('./commands/history');

class MessagesService {

    constructor() {
        this._commands = [];
        this.register(historyCommand);
    }

    register(command) {
        this._commands.push(command);
    }

    async process(commandData) {
        const [commandName, ...params] = commandData.split(' ');
        const command = this._commands.find((command) => command.name === commandName);

        if (command) {
            return command.execute(params);
        }
    }
}

module.exports = new MessagesService();
