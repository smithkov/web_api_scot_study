const controller = require("../controllers/gallery");
const { upload } = require("../utility/global");
const { rootUrl } = require("../utility/constants");
module.exports = (app) => {
  app.post(
    rootUrl("uploadGallery"),
    upload.fields([{ name: "url", maxCount: 1 }]),
    controller.create
  );

  app.post(rootUrl("galleries"), controller.findAll);

  app.delete(rootUrl("gallery/:id"), controller.delete);

  app.post(rootUrl("findGalleryById"), controller.findPk);
};
