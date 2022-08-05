// Middleware для аутентификации по логину и паролю

const bcrypt = require('bcrypt');

module.exports = (storageService) => (
    async (req, res, next) => {
        const {name, password} = req.body;
        const user = await storageService.findUser(name);

        if (!user) {
            const message = 'User not found';
            res.status(403)
                .json({ message });
            //console.error(message);
            return;
        }

        const matchPassword = await bcrypt.compare(password, user.password);
        
        if (!matchPassword) {
            const message = 'Wrong password'
            res.status(403)
                .json({ message });
            //console.error(message);
            return;
        }
  
        next();
    }
);
