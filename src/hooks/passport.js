const GoogleStrategy = require('passport-google-oauth20');
const mongoose = require('mongoose');
const {userModel} = require('../model/user'); 

module.exports = function (passport) {
    passport.use(new GoogleStrategy({
        clientID:process.env.GOOGLE_CLIENT_ID,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        callbackURL:'/login/choice/google/callback'
    },async (accessToken,refreshToken,profile,done)=>{
        const newuser = {
            googleId:profile.id,
            name:profile.displayName,
            image:profile.photos[0].value
        }
        try {
            let user = await userModel.findOne({googleId:profile.id})
            if (user) {
                done(null,user)
            }else{
                user = await userModel.create(newuser)
                done(null,user)
            }
        } catch (error) {
            console.log('---strategy error---')
            console.log(error)
        }
    }))

    passport.serializeUser((user, done) => done(null, user.id));
      
    passport.deserializeUser((id, done) => {
        userModel.findById(id, (err, user) => done(err, user));
    });


}