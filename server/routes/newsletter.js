const controller = require("../controllers/newsletter");
const { rootUrl } = require("../utility/constants");
module.exports = (app) => {
  app.post(rootUrl("newsletter"), controller.create);

  app.post(rootUrl("allNewsletter"), controller.findAll);

  app.get(rootUrl("findNewsLetterById/:id"), controller.findPk);
};
