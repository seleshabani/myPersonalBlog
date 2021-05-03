const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    googleId:{
        type:String,
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    encryptedPassword:{
        type:String,
    },
    image:{
        type:String
    },
    role:{ type: String, enum: ['admin', 'restricted']}
});
const userModel = mongoose.model('user',userSchema);

module.exports = {userModel,userSchema};