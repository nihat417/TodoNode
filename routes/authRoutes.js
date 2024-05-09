const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router = express.Router();
const User = require('../models/user');

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;


router.post('/register',async (req,res)=>{
    try {
        const {fullName,email,password} =req.body;
        const passwordHash = await bcrypt.hash(password,10);
        const user = new User({fullName,email,passwordHash});
        await user.save();
        res.status(201).send('User registered succsesfuly');
    } catch (error) {
        res.status(500).send('User registered succsesfuly');
    }
});

router.post('/login',async (req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user) return  res.status(400).send('invalid email or password');
        const validPassword = await bcrypt.compare(password,user.passwordHash);
        if(!validPassword) return  res.status(400).send('invalid email or password')
        const accessToken = generateAccessToken(user);
        const refreshToken = jwt.sign({email:user.email},REFRESH_TOKEN_SECRET);
        res.json({accessToken,refreshToken});
    } catch (error) {
        
    }
});


router.post('/refresh',(req,res)=>{
    const refreshToken = req.body.refreshToken;
    if(!refreshToken) return res.sendStatus(401);
    jwt.verify(refreshToken,REFRESH_TOKEN_SECRET,(err,user)=>{
        if(err) return res.sendStatus(403);
        const accessToken = generateAccessToken({email:user.email});
        res.json({accessToken});
    });
});


function authenticateToken(req,res,next){
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if(!token) return res.sendStatus(401);
    jwt.verify(token,ACCESS_TOKEN_SECRET,(err,user)=>{
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}


function generateAccessToken(user){
    return jwt.sign({email:user.email},ACCESS_TOKEN_SECRET,{
        expiresIn:"5m",
    });
}

module.exports = router;

module.exports.authenticateToken = authenticateToken;