const AdminBroExpress = require('@admin-bro/express')
const {userModel} = require('../../model/user')
const bcrypt = require('bcrypt')

const buildAdminBroRouter = (admin) => {
   const router =  AdminBroExpress.buildRouter(admin);
  // const router = AdminBroExpress.buildAuthenticatedRouter(admin, {
  //   authenticate: async (email, password) => {
  //    try {
  //     const userObj = await userModel.findOne({ email })
  //     if (userObj) {
  //       const matched = await bcrypt.compare(password, userObj.encryptedPassword)
  //       if (matched && userObj.role === 'admin') {
  //         return userObj
  //       }
  //     }
  //    } catch (error) {
  //      console.log(error)
  //    }
  //     return false
  //   },
  //   cookiePassword: 'some-secret-password-used-to-secure-cookie'
  // }, null, {
  //   resave: false,
  //   saveUninitialized: true,
  // })
  return router;
}
module.exports = buildAdminBroRouter;