const jwt = require('jsonwebtoken');
const User = require('../models/user'); 

async function requireAuth(req, res, next){
    try{
        //read token off cookies
        const token = req.cookies.Authorization;
        //decode the token
        const decoded = jwt.verify(token, process.env.SECRET);

        //check if token is expired
        if(decoded.exp < Date.now()) return res.sendStatus(401);
        
        //find user using decoded sub
        const user = await User.findById(decoded.sub);
        if(!user) {
            return res.sendStatus(401);
        }
        //attach user to req
        req.user = user;
        //continue on
        next();
    }
    catch{
        return res.sendStatus(401);
    }
}

module.exports = requireAuth;