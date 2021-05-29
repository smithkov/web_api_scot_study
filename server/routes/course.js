const controller = require("../controllers/course");
const { rootUrl } = require("../utility/constants");
module.exports = (app) => {
  app.post(rootUrl("saveCourse"), controller.create);

  app.patch(rootUrl("updateCourse/:id"), controller.update);

  app.post(rootUrl("courses"), controller.findAll);

  app.get(rootUrl("course/:id"), controller.findPk);

  app.get(rootUrl("runScript"), controller.runScript);

  app.post(rootUrl("searchCourse"), controller.courseSearch);

  app.post(rootUrl("popularCourses"), controller.popularCourses);

  app.post(rootUrl("findCoursesByFaculty"), controller.findCoursesByFaculty);

  app.post(rootUrl("allCoursesSearch"), controller.allCoursesSearch);

  app.post(
    rootUrl("findCourseByInstitution"),
    controller.findCourseByInstitution
  );

  app.post(rootUrl("courseByParams"), controller.courseByParams);

  app.post(
    rootUrl("findCourseByInstitutionForReg"),
    controller.findCourseByInstitutionForReg
  );

  app.delete(rootUrl("course/:id"), controller.delete);
};
