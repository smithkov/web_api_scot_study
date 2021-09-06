const controller = require("../controllers/visaApplyStatus");
const { rootUrl } = require("../utility/constants");
module.exports = (app) => {
  app.post(rootUrl("visaApplyStatus"), controller.create);

  app.post(rootUrl("visaApplyStatuses"), controller.findAll);

  app.get(rootUrl("visaApplyStatus/:id"), controller.findPk);

  app.patch(rootUrl("visaApplyStatus/:id"), controller.update);

  app.delete(rootUrl("visaApplyStatus/:id"), controller.delete);
};
