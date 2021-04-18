const adminBro = require('admin-bro');
const AdminBroMongoose = require('@admin-bro/mongoose');
const userOptions = require('./user.ressource.options');
const postOptions = require('./post.ressource.options');
const { categorieModel } = require('../model/categories');
const { sousCategorieModel } = require('../model/sous-categories');

adminBro.registerAdapter(AdminBroMongoose)
const adminBroOptions = {
    resources: [
        userOptions,categorieModel,postOptions,sousCategorieModel
    ],
    branding: {
        companyName: 'Mon blog',
    }
}

module.exports = adminBroOptions;