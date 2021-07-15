const controller = require("../controllers/phdApplication");
const { rootUrl } = require("../utility/constants");
module.exports = (app) => {
  app.post(rootUrl("savePhdApplication"), controller.create);

  //app.patch(rootUrl("updateCourse/:id"), controller.update);

  app.post(rootUrl("findPhdApplications"), controller.findAll);

  app.post(rootUrl("findPhdApplicationById"), controller.findPk);

  app.delete(rootUrl("phdDelete/:id"), controller.delete);
};
