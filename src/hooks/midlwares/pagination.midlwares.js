require('dotenv').config();

const paginate = (model, search = false,byCat=false) => {
    return async (req, res, next) => {
        if (req.query.page) {
            const page = parseInt(req.query.page);
            const limit = parseInt(req.query.limit);
            const startIdx = (page - 1) * limit;
            const endIdx = page * limit;
            const results = {};
            
            
            try {
                if (search) {
                    results.results = await model.find({ name: { $regex: new RegExp(req.query.request) } })
                        .limit(limit).skip(startIdx).exec();
                    results.nbr = await model.find({ name: { $regex: new RegExp(req.params.q) } }).countDocuments();
                }else if(byCat){
                    results.results = await model.find({categorieId:req.query.catId}).limit(limit).skip(startIdx).exec();
                    results.nbr = await model.find({categorieId:req.query.catId}).countDocuments()
                } else {
                    results.results = await model.find().limit(limit).skip(startIdx).exec();
                    results.nbr = await model.find().countDocuments()
                }
                if (endIdx < results.nbr) {
                    results.next = {
                        page: page + 1,
                        limit: limit
                    }
                }
    
                if (startIdx > 0) {
                    results.previous = {
                        page: page - 1,
                        limit: limit
                    }
                }
                
                res.paginatedResults = results;
                next();
            } catch (error) {
                console.log(error)
                res.append(process.env.cors_header, process.env.authorized_cors_url).status(500).json('erreur serveur pendant la pagination');
            }
        } else {
            next()
        }
    }
}
module.exports = { paginate }