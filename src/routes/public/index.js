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
        let rescentPosts = await postModel.find().limit(4);
        res.render('global/index',{rescentPosts:rescentPosts});

    } catch (error) {
        console.log(error)
        res.status(500);
        res.render('error/server')
    }
})
module.exports = indexRouter