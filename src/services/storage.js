const bcrypt = require('bcrypt');
const db = require('../lib/mysql');

class StorageService {

    constructor () {
    }

    async findUser(name) {
        const [rows] = await db.query('SELECT `name`, `password` FROM `users` WHERE `name` = ?', [name]);
        return rows[0];
    }
  
    async checkUser(user, password) {
        const matchPassword = await bcrypt.compare(password, user.password);
        return matchPassword;
    }

    async getHistory(count) {
        const result = [];
        for (let i = 0; i < count; ++i)
            result.push(Math.random());

        return result;
    }
}
  
module.exports = new StorageService();
