const controller = require("../controllers/qualificationType");
const { rootUrl } = require("../utility/constants");
module.exports = (app) => {
  app.post(rootUrl("qualificationType"), controller.create);

  app.post(rootUrl("qualificationTypes"), controller.findAll);

  app.get(rootUrl("qualificationType/:id"), controller.findPk);

  app.patch(rootUrl("qualificationType/:id"), controller.update);

  app.delete(rootUrl("qualificationType/:id"), controller.delete);
};
