const controller = require("../controllers/qualification");
const { rootUrl } = require("../utility/constants");
module.exports = (app) => {
  app.post(rootUrl("qualification"), controller.create);

  //app.post(rootUrl("faculties"), controller.findAll);

  app.post(rootUrl("findHighestQualificationByUser"), controller.findByUser);

  app.delete(rootUrl("qualification/:id"), controller.delete);
};
