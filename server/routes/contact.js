const controller = require("../controllers/contact");
const { rootUrl } = require("../utility/constants");
module.exports = (app) => {
  app.post(rootUrl("contact"), controller.create);

  app.post(rootUrl("allContacts"), controller.findAll);

  app.get(rootUrl("findContactById/:id"), controller.findPk);
};
