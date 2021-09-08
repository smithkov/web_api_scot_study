const controller = require("../controllers/document");
const { rootUrl } = require("../utility/constants");
const { upload } = require("../utility/global");
module.exports = (app) => {
  app.post(
    rootUrl("uploadDocument"),
    upload.fields([{ name: "docs", maxCount: 1 }]),
    controller.create
  );

  app.post(rootUrl("findUserDocuments"), controller.findAllByUserId);
};
