const mongoose = require('mongoose');
const {categorieSchema } = require('./categories');

const postSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    resume:{
        type:String,
        text:true
    },
    markdown:{
        type:String,
        required:true,
        text:true
    },
    categorie:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'categorie'
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