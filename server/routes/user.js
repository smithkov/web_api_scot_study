const controller = require("../controllers/user");
const { rootUrl } = require("../utility/constants");
const { AUTH } = require("../utility/constants");
require("dotenv").config();
module.exports = (app) => {
  app.post(rootUrl("signUp"), controller.signUp);

  app.post(rootUrl("signIn"), controller.signIn);

  app.post(rootUrl("allUsers"), controller.findAll);

  app.get(rootUrl("isLogin"), AUTH, controller.isLogin);

  app.post(rootUrl("userById"), controller.userById);

  // app.get(rootUrl("user/:id"), controller.findPk);

  app.patch(rootUrl("user/:id"), controller.update);

  // app.delete(rootUrl("user/:id"), controller.delete);
};
