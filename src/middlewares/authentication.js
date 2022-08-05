module.exports = (storageService) => (
    async (req, res, next) => {
        const {name, password} = req.body;
        const user = await storageService.findUser(name);

        if (!user) {
            const message = 'User not found';
            res.status(403)
                .json({ message });
            console.error(message);
            return;
        }
        
        if (!await storageService.checkUser(user, password)) {
            const message = 'Wrong password'
            res.status(403)
                .json({ message });
            console.error(message);
            return;
        }
  
        next();
    }
);
