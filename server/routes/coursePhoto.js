const controller = require("../controllers/coursePhoto");
const { upload } = require("../utility/global");
const { rootUrl } = require("../utility/constants");
module.exports = (app) => {
  app.post(
    rootUrl("uploadCoursePhoto"),
    upload.fields([{ name: "url", maxCount: 1 }]),
    controller.create
  );
  app.post(rootUrl("coursePhotos"), controller.findAll);

  app.post(rootUrl("autoCoursePhotoUpdate"), controller.autoUpdate);

  app.post(rootUrl("findCoursePhotoById"), controller.findPk);
};
