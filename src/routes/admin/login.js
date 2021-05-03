const express = require('express');
const passport = require('passport')
const loginRouter = express.Router();
const namedRouter = require('../../hooks/namedRouter');
namedRouter.extendExpress(loginRouter);

loginRouter.get('/choice','login.choice',async (req,res)=>{
    res.locals.page = 'login with...'
    res.render('login/loginChoice');
})

loginRouter.get('/choice/google','login.choice.google')
loginRouter.get('/choice/google',passport.authenticate('google', { scope: ['profile'] }))


loginRouter.get('/choice/google/callback',passport.authenticate('google',{failureRedirect:'/'}),(req,res)=>{
    //res.locals.user = req.user;
    res.redirect('/');
});

module.exports = loginRouter 