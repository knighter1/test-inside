// Сервис хранилища данных

const db = require('../lib/mysql');

class StorageService {

    constructor () {
        this._users = [];
    }

    // Метод производит поиск пользователя по имени, поддерживает кеширование
    async findUser(name) {
        
        const user = this._users.find((user) => user.name === name);

        if (user) {
            return user;
        }
        
        try {
            const [rows] = await db.query('SELECT `id`, `name`, `password` FROM `users` WHERE `name` = ?', [name]);

            if (rows.length) {
                this._users.push(rows[0]);
                return rows[0];
            }
        }
        catch (err) {
            console.log(err);   
        }
    }

    // Метод добавляет новое сообщение от пользователя
    addHistory(user, message) {
        try {
            db.query('INSERT INTO `messages` (id, `user_id`, `message`) VALUES (0, ?, ?)', [user.id, message]);
        }
        catch (err) {
            console.log(err);   
        }
    }

    // Метод для получения историй сообщений
    async getHistory(count) {
        try {
            const [ rows ] = await db.query('SELECT `message` FROM `messages` ORDER BY `id` DESC LIMIT ?', [parseInt(count)]);
            
            const result = Array.from(rows, (row) => {
                const { message } = row;
                return message; 
            });
            
            return result;
        }
        catch (err) {
            console.log(err);   
        }
    }
}
  
module.exports = new StorageService();
