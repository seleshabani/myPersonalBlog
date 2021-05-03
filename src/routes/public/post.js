const express = require('express');
const { localsDataMidlwares } = require('../../hooks/midlwares/locals.midlwares');
const { paginate } = require('../../hooks/midlwares/pagination.midlwares');
const postRouter = express.Router();
const namedRouter = require('../../hooks/namedRouter');
const { categorieModel } = require('../../model/categories');
const {CommentModel} = require('../../model/comments');
const { postModel } = require('../../model/posts');

namedRouter.extendExpress(postRouter);
postRouter.use(localsDataMidlwares)



postRouter.get('/:id','post-single',async (req,res)=>{
    try {
        let id = req.params.id;
        let last = await postModel.findById(id)
        let post = await postModel.findOneAndUpdate({_id:id},{view:last.view+1});
        let comments = await CommentModel.find({postId:post._id})

        if (post) {
            res.locals.page = post.name;
            res.render('posts/single',{post:post,comments:comments})
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

postRouter.post('/:id',async (req,res)=>{
  try {
    let id = req.params.id;
    let post = await postModel.findById(id)
    let {email,name,content} = req.body;
    let comment = {autorMail:email,autorName:name,content:content,postId:post._id}
    comment = await CommentModel.create(comment);
    let comments = await CommentModel.find({postId:post._id})

    if (post) {
        res.locals.page = post.name;
        res.render('posts/single',{post:post,comments})
    }else{
        res.status(404);
        res.render('error/404');
    }
  } catch (error) {
      console.log(error)
  }
})

postRouter.use(paginate(postModel,false,true));
postRouter.get('/categories/views','post-byCat',async (req,res)=>{
    try {
        let id = req.query.catId;
        //let posts = await postModel.find({categorieId:id});
        let categorie = await categorieModel.findById(id)
        res.locals.page = `categorie : ${categorie.name}`
       // console.log(res.paginatedResults)
        res.render('posts/by-categories',{posts:res.paginatedResults,categorie:categorie});
    } catch (error) {
        console.log(error)
        res.status(500);
        res.render('error/server');
    }
})
postRouter.use(paginate(postModel,true,false));
postRouter.get('/search/result','post-search',async (req,res)=>{

    let searcQ = req.query.request;
    res.render('posts/search',{posts:res.paginatedResults,searchq:searcQ})
})
postRouter.use(paginate(postModel,false,true,true));
postRouter.get('/categoiries/sCategories/views','post-byScat',async (req,res)=>{
    res.render('posts/by-sous-categorie');
})

module.exports = postRouter;