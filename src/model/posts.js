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
    sousCategorie:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'sousCategorie'
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
    },
    view:{
        type:Number,
        default:0
    },
    shared:{
        type:Number,
        default:0
    }
});

const postModel = mongoose.model('post',postSchema);
module.exports = {postSchema,postModel}