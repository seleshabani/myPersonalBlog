const mongoose = require('mongoose');

const sousCategorieSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        tpe:String
    },
    categorie:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'categorie',
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})
const sousCategorieModel = mongoose.model('sousCategorie',sousCategorieSchema);
module.exports = {sousCategorieModel,sousCategorieSchema};