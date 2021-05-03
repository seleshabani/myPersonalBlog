require('dotenv').config()
const { categorieModel } = require("../../model/categories");

const localsDataMidlwares = async (req,res,next)=>{
    try {
        let locals = {
            websiteName:process.env.websiteName,
            categories:await categorieModel.find(),
            page:'Accueil'
        }

        if (req.isAuthenticated()) {
            locals.user = req.user
        }
        res.locals = locals;
        next();
    } catch (error) {
        console.log('midlware :',error);
        next();
    }
}
module.exports = {localsDataMidlwares};