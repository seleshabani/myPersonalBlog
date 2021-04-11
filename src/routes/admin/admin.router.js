const AdminBroExpress = require('@admin-bro/express')

const buildAdminBroRouter = (admin)=>{
  const router =  AdminBroExpress.buildRouter(admin);

  return router;
}
module.exports = buildAdminBroRouter;