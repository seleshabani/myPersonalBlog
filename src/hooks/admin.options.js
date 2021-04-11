const adminBro = require('admin-bro');
const AdminBroMongoose = require('@admin-bro/mongoose');

const adminBroOptions = {
    resources: [],
    branding: {
        companyName: 'Mon blog',
    }
}

module.exports = adminBroOptions;