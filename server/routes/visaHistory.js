const controller = require("../controllers/visaHistory");
const { rootUrl } = require("../utility/constants");
module.exports = (app) => {
  app.post(rootUrl("visaHistory"), controller.create);

  //app.post(rootUrl("faculties"), controller.findAll);

  app.post(rootUrl("findVisaHistoryByUser"), controller.findByUser);

  app.patch(rootUrl("visaHistory/:id"), controller.update);

  app.delete(rootUrl("visaHistory/:id"), controller.delete);
};
