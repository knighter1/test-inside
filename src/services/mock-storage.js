// Сервис хранилища данных
const bcrypt = require('bcrypt');
const { messages } = require('../../mock-data');

const saltRounds = 10;

class MockStorageService {

    constructor () {
        this._users = [{
            id: 1,
            name: 'test',
            password: bcrypt.hashSync('test', saltRounds)
        },
        {
            id: 2,
            name: 'John',
            password: bcrypt.hashSync('passwd', saltRounds)
        }];

        this._messages = messages;
    }

    addHistory(_user, _message) {}

    async findUser(name) {
        return this._users.find((user) => user.name === name);
    }

    // Метод для получения историй сообщений
    async getHistory(count) {
        return this._messages.reverse().slice(0, count);     
    }
}
  
module.exports = new MockStorageService();
