const controller = require("../controllers/agent");
const { rootUrl } = require("../utility/constants");
const { AUTH } = require("../utility/constants");
require("dotenv").config();
module.exports = (app) => {
  app.post(rootUrl("agentSignUp"), controller.signUp);

  app.post(rootUrl("agentSignIn"), controller.signIn);

  app.post(rootUrl("findAllUsersByAgent"), controller.findAllUsersByAgent);

  app.post(rootUrl("createAgentUser"), controller.AddUser);

  app.post(rootUrl("findAllAgents"), controller.findAllAgent);

  app.post(rootUrl("findAgentApplications"), controller.findAgentApplications);

  //app.get(rootUrl("isLogin"), AUTH, controller.isLogin);

  app.post(rootUrl("agentById"), controller.agentById);

  app.patch(rootUrl("agent/:id"), controller.update);
};
