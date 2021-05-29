const controller = require("../controllers/highSchool");
const { rootUrl } = require("../utility/constants");
module.exports = (app) => {
  app.post(rootUrl("highSchool"), controller.create);

  //app.post(rootUrl("faculties"), controller.findAll);

  app.post(rootUrl("findHighSchoolByUser"), controller.findByUser);

  app.patch(rootUrl("highSchool/:id"), controller.update);

  app.delete(rootUrl("highSchool/:id"), controller.delete);
};
