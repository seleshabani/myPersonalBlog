require('dotenv').config();
const express = require('express')
const app = express();
const { default: AdminBro } = require("admin-bro");
const adminBroOptions = require('./hooks/admin.options');
const buildAdminBroRouter = require("./routes/admin/admin.router");
const path = require('path')
const {connectDb} = require('./hooks/functions');
const PORT = process.env.PORT || 3500;
const run = async ()=>{

    const adminBro = new AdminBro(adminBroOptions);
    const adminRouter = buildAdminBroRouter(AdminBro);
    try {
        await connectDb(process.env.db);
    } catch (error) {
        console.log(error)
    }
    app.use(adminBro.options.rootPath,adminRouter);
    app.set('view engine', 'ejs')
    app.use(express.static('/public',path.join(__dirname,'../public')))
    app.use(express.urlencoded({ extended: true }));
    
    app.listen(PORT,()=>{
        console.log(`server on http://localhost:/${PORT}`);
    })
}
module.exports = run;