const express = require('express')
const indexRouter = express.Router();

indexRouter.get('/',(req,res)=>{
    res.render('home/index');
})

module.exports = indexRouter