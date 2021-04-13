const bcrypt = require('bcrypt')
const {userModel} = require('../model/user')

const userOptions = {
    resource: userModel,
    options: {
        properties: {
            encryptedPassword: {
                isVisible: false,
            },
            password: {
                type: 'string',
                isVisible: {
                    list: false, edit: true, filter: false, show: false,
                },
            },
        },
        actions: {
            new: {
                before: async (request) => {
                    if (request.payload.password) {
                        try {
                            request.payload = {
                                ...request.payload,
                                encryptedPassword: await bcrypt.hash(request.payload.password, 10),
                                password: undefined,
                            }
                        } catch (error) {
                            console.log(error)
                        }
                    }
                    return request
                },
            }
        }
    }
}

module.exports = userOptions;