const controller = require("../controllers/phdQualification");
const { rootUrl } = require("../utility/constants");
module.exports = (app) => {
  app.post(rootUrl("savePhdQualification"), controller.create);

  //app.patch(rootUrl("updateCourse/:id"), controller.update);

  app.post(rootUrl("findPhdQualifications"), controller.findAll);

  app.post(rootUrl("findPhdQualificationById"), controller.findPk);

  app.delete(rootUrl("PhdQualificationDelete/:id"), controller.delete);
};
