const express = require('express');
const { localsDataMidlwares } = require('../../hooks/midlwares/locals.midlwares');
const postRouter = express.Router();
const namedRouter = require('../../hooks/namedRouter');
const { postModel } = require('../../model/posts');

namedRouter.extendExpress(postRouter);
postRouter.use(localsDataMidlwares)

postRouter.get('/:id','post-single',async (req,res)=>{
    try {
        let id = req.params.id;
        let post = await postModel.findById(id);

        if (post) {
            res.locals.page = post.name;
            res.render('posts/single',{post:post})
        }else{
            res.status(404);
            res.render('error/404');
        }
    } catch (error) {
        console.log(error)
        res.status(500);
        res.render('error/server');
    }
})

module.exports = postRouter;