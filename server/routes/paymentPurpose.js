const controller = require("../controllers/paymentPurpose");
const { rootUrl } = require("../utility/constants");
module.exports = (app) => {
  app.post(rootUrl("paymentPurpose"), controller.create);

  app.post(rootUrl("findAllPaymentPurpose"), controller.findAll);

  app.get(rootUrl("paymentPurpose/:id"), controller.findPk);

  app.patch(rootUrl("paymentPurpose/:id"), controller.update);

  app.delete(rootUrl("paymentPurpose/:id"), controller.delete);
};
