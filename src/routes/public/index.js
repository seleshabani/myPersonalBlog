const express = require('express');
const { localsDataMidlwares } = require('../../hooks/midlwares/locals.midlwares');
const { categorieModel } = require('../../model/categories');
const indexRouter = express.Router();
const {postModel} = require('../../model/posts')

indexRouter.get('/',localsDataMidlwares,async (req,res)=>{

    try {
        let rescentPosts = await postModel.find().limit(4);
        res.render('home/index',{locals:res.locals,rescentPosts:rescentPosts});

    } catch (error) {
        res.status(500);
        res.render('error/server')
    }
})
module.exports = indexRouter