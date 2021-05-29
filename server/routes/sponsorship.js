const controller = require("../controllers/sponsorship");
const { rootUrl } = require("../utility/constants");
module.exports = (app) => {
  app.post(rootUrl("sponsorship"), controller.create);

  // app.post(rootUrl("faculties"), controller.findAll);

  app.post(rootUrl("findSponsorshipByUser"), controller.findByUser);

  app.patch(rootUrl("sponsorship/:id"), controller.update);

  app.delete(rootUrl("sponsorship/:id"), controller.delete);
};
