const controller = require("../controllers/institution");
const { upload } = require("../utility/global");
const { rootUrl } = require("../utility/constants");
module.exports = (app) => {
  app.post(
    rootUrl("saveInstitution"),
    upload.fields([
      { name: "logo", maxCount: 1 },
      { name: "banner", maxCount: 1 },
    ]),
    controller.create
  );

  app.post(rootUrl("allInstitutions"), controller.findAll);

  app.post(rootUrl("institutions"), controller.findAll);

  app.post(rootUrl("findInstitutionById"), controller.findPk);

  app.patch(rootUrl("institution/:id"), controller.update);
  app.post(rootUrl("institutionsLighter"), controller.findAllLighter);

  app.delete(rootUrl("institution/:id"), controller.delete);
};
