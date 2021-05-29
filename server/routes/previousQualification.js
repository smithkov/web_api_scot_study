const controller = require("../controllers/previousQualification");
const { rootUrl } = require("../utility/constants");
module.exports = (app) => {
  app.post(rootUrl("previousQualification"), controller.create);

  //app.post(rootUrl("faculties"), controller.findAll);

  app.post(rootUrl("findPreviousQualificationByUser"), controller.findByUser);

  app.patch(rootUrl("previousQualification/:id"), controller.update);

  app.delete(rootUrl("previousQualification/:id"), controller.delete);
};
