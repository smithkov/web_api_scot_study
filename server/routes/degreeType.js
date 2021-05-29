const controller = require("../controllers/degreeType");
const { rootUrl } = require("../utility/constants");
module.exports = (app) => {
  app.post(rootUrl("degreeType"), controller.create);

  app.post(rootUrl("degreeTypes"), controller.findAll);

  app.get(rootUrl("degreeType/:id"), controller.findPk);

  app.patch(rootUrl("degreeType/:id"), controller.update);

  app.delete(rootUrl("degreeType/:id"), controller.delete);
};
