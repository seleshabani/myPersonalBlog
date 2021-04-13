const mongoose = require('mongoose');

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
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    image:{
        type:String
    },
    image_path:{
        type:String
    }
});

const postModel = mongoose.model('post',postSchema);

module.exports = {postSchema,postModel}