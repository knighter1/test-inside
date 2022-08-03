const bcrypt = require(`bcrypt`);

const saltRounds = 10;

class StorageService {

    constructor () {
        this._users = [
            {
                name: 'John',
                password: bcrypt.hashSync('passwd', saltRounds)
            }
        ];
    }

    async findUser(name) {
        return this._users.find((user) => user.name === name);
    }
  
    async checkUser(user, password) {
        const matchPassword = await bcrypt.compare(password, user.password);
        return matchPassword;
    }
}
  
module.exports = new StorageService();
