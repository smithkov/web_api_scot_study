const controller = require("../controllers/decision");
const { rootUrl } = require("../utility/constants");
module.exports = (app) => {
  app.post(rootUrl("decision"), controller.create);

  app.post(rootUrl("decisions"), controller.findAll);

  app.get(rootUrl("decision/:id"), controller.findPk);

  app.patch(rootUrl("decision/:id"), controller.update);

  app.delete(rootUrl("decision/:id"), controller.delete);
};
