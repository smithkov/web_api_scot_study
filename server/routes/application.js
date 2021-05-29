const controller = require("../controllers/application");
const { rootUrl } = require("../utility/constants");
module.exports = (app) => {
  app.post(rootUrl("saveApplication"), controller.create);

  app.post(rootUrl("allApplications"), controller.findAll);

  app.post(rootUrl("findApplicationsByUser"), controller.findAllByuser);

  app.post(rootUrl("findOneApplicationByUser"), controller.findOneByuser);

  //app.get(rootUrl("application/:id"), controller.findPk);

  app.patch(rootUrl("application/:id"), controller.update);

  app.patch(rootUrl("decisionUpdate/:id"), controller.decisionUpdate);

  app.delete(rootUrl("application/:id"), controller.delete);
};
