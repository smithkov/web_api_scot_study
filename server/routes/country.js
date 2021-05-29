const controller = require("../controllers/country");
const { rootUrl } = require("../utility/constants");
module.exports = (app) => {
  app.post(rootUrl("country"), controller.create);

  app.post(rootUrl("countries"), controller.findAll);

  app.get(rootUrl("country/:id"), controller.findPk);

  app.patch(rootUrl("country/:id"), controller.update);

  app.delete(rootUrl("country/:id"), controller.delete);
};
