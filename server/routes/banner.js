const controller = require("../controllers/banner");
const { rootUrl } = require("../utility/constants");
const { upload } = require("../utility/global");
module.exports = (app) => {
  app.post(
    rootUrl("banner"),
    upload.fields([{ name: "url", maxCount: 1 }]),
    controller.create
  );

  app.post(rootUrl("banners"), controller.findAll);

  app.post(rootUrl("findBannerById"), controller.findPk);

  app.patch(rootUrl("banner/:id"), controller.update);

  app.delete(rootUrl("banner/:id"), controller.delete);
};
