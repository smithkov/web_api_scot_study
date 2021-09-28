const controller = require("../controllers/user");
const { rootUrl } = require("../utility/constants");
const { AUTH } = require("../utility/constants");
require("dotenv").config();
module.exports = (app) => {
  app.post(rootUrl("signUp"), controller.signUp);

  app.post(rootUrl("signIn"), controller.signIn);

  app.post(rootUrl("allUsers"), controller.findAll);

  app.post(rootUrl("findAllUserForDash"), controller.findAllUserForDash);

  app.post(rootUrl("runUserMigration"), controller.runUserMigration);

  app.post(
    rootUrl("runApplicationMigration"),
    controller.runApplicationMigration
  );

  app.get(rootUrl("isLogin"), AUTH, controller.isLogin);

  app.post(rootUrl("userById"), controller.userById);

  app.post(rootUrl("forgotPassword"), controller.forgotPassword);

  app.post(rootUrl("resetPassword"), controller.resetPassword);

  app.post(rootUrl("resetPasswordPost"), controller.resetPasswordPost);

  // app.get(rootUrl("user/:id"), controller.findPk);

  app.patch(rootUrl("user/:id"), controller.update);

  app.delete(rootUrl("user/:id"), controller.delete);
};
