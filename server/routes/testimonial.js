const controller = require("../controllers/testimonial");
const { rootUrl } = require("../utility/constants");
const { upload } = require("../utility/global");
module.exports = (app) => {
  app.post(
    rootUrl("testimonial"),
    upload.fields([{ name: "url", maxCount: 1 }]),
    controller.create
  );

  app.post(rootUrl("testimonials"), controller.findAll);

  app.post(rootUrl("findTestimonialById"), controller.findPk);

  app.delete(rootUrl("testimonial/:id"), controller.delete);
};
