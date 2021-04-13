const mongoose = require('mongoose');
const {categorieSchema } = require('./categories');

const postSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    resume:{
        type:String
    },
    markdown:{
        type:String,
        required:true
    },
    categorieId:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    image:{
        type:String
    },
    imageBucket:{
        type:String
    }
});

const postModel = mongoose.model('post',postSchema);
module.exports = {postSchema,postModel}