const handle404 = (req,res,next)=>{
    res.status(404);
    res.render('error/404');
}
module.exports = {handle404};