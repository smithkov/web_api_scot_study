const controller = require("../controllers/facultyPhoto");
const { rootUrl } = require("../utility/constants");
module.exports = (app) => {
  app.post(rootUrl("images_create"), controller.addCreate);

  app.post(rootUrl("findFacultyPhotos"), controller.findByFaculty);

  app.post(rootUrl("findAllPhotos"), controller.findAll);
};
