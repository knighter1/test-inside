module.exports = (storageService) => (

    async (req, res, next) => {
        const {name, password} = req.body;
        const user = await storageService.findUser(name);

        if (!user) {
            res.status(403)
                .json({message: 'User not found'});
            return;
        }
        
        if (!await storageService.checkUser(user, password)) {
            res.status(403)
                .json({message: 'Wrong password'});
    
            return;
        }
  
        next();
    }
);
