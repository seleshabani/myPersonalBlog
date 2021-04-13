require('dotenv').config();
const express = require('express')
const ejsLayout = require('express-ejs-layouts');
const mongoose = require('mongoose');
const app = express();
const { default: AdminBro } = require("admin-bro");
const adminBroOptions = require('./hooks/admin.options');
const buildAdminBroRouter = require("./routes/admin/admin.router");
const path = require('path')
// const { connectDb } = require('./hooks/functions');
const PORT = process.env.PORT || 3500;

const run = async () => {

    app.use('/public', express.static(path.join(__dirname, '../public')));
    const adminBro = new AdminBro(adminBroOptions);
    const adminRouter = buildAdminBroRouter(adminBro);
    app.use(adminBro.options.rootPath, adminRouter);

    try {
        await mongoose.connect(process.env.db,
            { useNewUrlParser: true, useUnifiedTopology: true }, () => {
                console.log('db connected')
            });
    } catch (error) {
        console.log(error)
    }
    
    app.set('view engine', 'ejs')
    //app.set('layouts','ejs-layouts')
    app.use(ejsLayout);
    app.use(express.urlencoded({ extended: true }));

    app.listen(PORT, () => {
        console.log(`server on http://localhost:/${PORT}`);
    })
}
module.exports = run;