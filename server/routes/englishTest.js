const controller = require("../controllers/englishTest");
const { rootUrl } = require("../utility/constants");
module.exports = (app) => {
  app.post(rootUrl("englishTest"), controller.create);

  app.post(rootUrl("Englishtests"), controller.findAll);

  app.post(rootUrl("findEnglishByUser"), controller.findByUser);

  app.patch(rootUrl("englishTest/:id"), controller.update);

  app.delete(rootUrl("englishTest/:id"), controller.delete);
};
