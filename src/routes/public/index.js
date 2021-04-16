const express = require('express');
const { localsDataMidlwares } = require('../../hooks/midlwares/locals.midlwares');
const { categorieModel } = require('../../model/categories');
const indexRouter = express.Router();
const {postModel} = require('../../model/posts')
const namedRouter = require('../../hooks/namedRouter');

namedRouter.extendExpress(indexRouter);
indexRouter.use(localsDataMidlwares)

indexRouter.get('/','home',async (req,res)=>{
    try {
        let topView = await postModel.find().populate('categorie').sort({view:'desc'}).limit(4);
        let latestPost = await postModel.find().populate('categorie').sort({createdAt:'desc'}).limit(3);
        res.render('global/index',{topView:topView,latestPost:latestPost});

    } catch (error) {
        console.log(error) 
        res.status(500);
        res.render('error/server')
    }
})

indexRouter.get('/search-form','post-search-form',async (req,res)=>{
    res.render('global/search');
})
module.exports = indexRouter