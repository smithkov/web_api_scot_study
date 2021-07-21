const controller = require("../controllers/payment");
const { rootUrl } = require("../utility/constants");
const { AUTH } = require("../utility/constants");
require("dotenv").config();
module.exports = (app) => {
  app.post(rootUrl("make_payment"), controller.paymentSession);

  app.post(rootUrl("findAllPayments"), controller.findAllPayments);

  app.post(rootUrl("findUserPayments"), controller.findUserPayments);

  app.post(rootUrl("updatePayment"), controller.updatePayment);

  app.post(rootUrl("stripeSessionStatus"), controller.stripeSessionStatus);
};
