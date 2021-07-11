const controller = require("../controllers/faculty");
const { rootUrl } = require("../utility/constants");
module.exports = (app) => {
  app.post(rootUrl("faculty"), controller.create);

  app.post(rootUrl("faculties"), controller.findAll);

  app.post(rootUrl("facultiesLight"), controller.findAllLight);

  app.post(rootUrl("coursesForHome"), controller.coursesForHome);

  app.get(rootUrl("faculty/:id"), controller.findPk);

  app.patch(rootUrl("faculty/:id"), controller.update);

  app.delete(rootUrl("faculty/:id"), controller.delete);
};
