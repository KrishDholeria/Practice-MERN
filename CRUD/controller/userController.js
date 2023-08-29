const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function signup(req, res){
    try{
        const {email, password} = req.body;

        //hash password
        const hashPassword = bcrypt.hashSync(password, 8);

        const user = await User.create({email, password: hashPassword});
        res.sendStatus(200);
    }
    catch(error){
        console.log(error);
        res.sendStatus(400);
    }

};

async function login(req, res){
    try{
        //get email and password from req.body
        const {email, password} = req.body;

        //find user with email
        const user = await User.findOne({email});
        if(!user) return res.sendStatus(401);

        //compare password
        const isMatch = bcrypt.compareSync(password, user.password);
        if(!isMatch) return res.sendStatus(401); 

        //create jwt token
        const exp = Date.now()+ 1000*10;
        const token = jwt.sign({ sub:user._id, exp }, process.env.SECRET);

        //set the cookie
        res.cookie('Authorization', token, {
            expires: new Date(exp),
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === "production",
        })

        //send token to client
        res.sendStatus(200);
    }catch(err){
        console.log(err);
        res.sendStatus(400);
    }
};

function logout(req, res){
    try{
        
        res.clearCookie('Authorization');
        res.sendStatus(200);
    }catch(err){
        console.log(err);
        res.sendStatus(400);
    }
};

function checkAuth(req, res){
    try{
        res.sendStatus(200);
    }catch(err){
        console.log(err);
        res.sendStatus(400);
    }
}

module.exports = {
    signup,
    login,
    logout,
    checkAuth,
}