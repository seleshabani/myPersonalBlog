const mongoose = require('mongoose');
const CommentSchema = mongoose.Schema({
    autorMail:{
        type:String,
        required:true
    },
    autorName:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'post',
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const CommentModel = mongoose.model('Comments',CommentSchema);
module.exports = {CommentModel,CommentSchema}