require('dotenv').config();
const express = require('express')
const ejsLayout = require('express-ejs-layouts');
const app = express();
const { default: AdminBro } = require("admin-bro");
const adminBroOptions = require('./hooks/admin.options');
const buildAdminBroRouter = require("./routes/admin/admin.router");
const path = require('path');
const indexRouter = require('./routes/public');
 const { connectDb } = require('./hooks/functions');
const PORT = process.env.PORT || 3500;
const namedRouter = require('./hooks/namedRouter');

const run = async () => {

    app.use('/public', express.static(path.join(__dirname, '../public')));
    const adminBro = new AdminBro(adminBroOptions);
    const adminRouter = buildAdminBroRouter(adminBro);
    app.use(adminBro.options.rootPath, adminRouter);
    namedRouter.registerAppHelpers(app);
    try {
        await connectDb(process.env.db)
    } catch (error) {
        console.log(error)
    }
    
    app.set('view engine', 'ejs')
    app.set('views',path.join(__dirname, 'views'))
    app.set('layout',path.join(__dirname, 'views/layout/layout'));
    app.set("layout extractScripts", true) 
    app.use(ejsLayout);
    app.use(express.urlencoded({ extended: true }));
    app.use('/',indexRouter);

    app.listen(PORT, () => {
        console.log(`server on http://localhost:/${PORT}`);
    })
}
module.exports = run;