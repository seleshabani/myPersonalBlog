const adminBro = require('admin-bro');
const AdminBroMongoose = require('@admin-bro/mongoose');
const userOptions = require('./user.ressource.options');

adminBro.registerAdapter(AdminBroMongoose)
const adminBroOptions = {
    resources: [
        userOptions
    ],
    branding: {
        companyName: 'Mon blog',
    }
}

module.exports = adminBroOptions;