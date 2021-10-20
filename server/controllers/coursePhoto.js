const CoursePhoto = require("../models").CoursePhoto;
const Course = require("../models").Course;

const Query = new require("../utility/crud");

const { SERVER_ERROR, OK, VALIDATION_ERROR } = require("../utility/statusCode");
const query = new Query(CoursePhoto);

const courseQuery = new Query(Course);

module.exports = {
  create: async (req, res) => {
    const { id, facultyId } = req.body;
    let data;
    const photoObject = req.files.url;

    const photo = photoObject ? photoObject[0].location : null;
    if (id) {
      const findCoursePhoto = await query.findPK(id);

      data = await query.update(id, {
        id,
        facultyId,
        url: photo || findCoursePhoto.url,
      });
    } else {
      data = await query.add({
        facultyId,
        url: photo || "",
      });
    }
    return res.status(OK).send({ data: data, error: false });
  },
  findPk(req, res) {
    const id = req.body.id;

    return query
      .findPK(id)
      .then((data) => res.status(OK).send({ error: false, data: data }))
      .catch((error) => res.status(OK).send({ error: true }));
  },

  autoUpdate: async (req, res) => {
    const findCourse = await Course.findAll();

    //findCourse.map(async (item) => {
    // console.log("count---");
    // console.log(findCourse.length);
    // console.log("count ----");
    for (const item of findCourse) {
      const findCoursePhoto = await CoursePhoto.findAll({
        where: { facultyId: item.FacultyId },
      });
      console.log("---------------------------------------course Photo");
      console.log(findCoursePhoto.length);
      console.log("---------------------------------------course Photo");
      if (findCoursePhoto.length > 1) {
        const photoCount = findCoursePhoto.length;
        const rand = Math.floor(Math.random() * photoCount);
        // const rand = Math.floor(Math.random() * (photoCount - 0 + 1)) + 0;

        // await courseQuery.update(item.id, {
        //   coursePhotoId: findCoursePhoto[rand].id,
        // });
        console.log("--------------------------------we");
        console.log(findCoursePhoto[rand].id);
        console.log("--------------------------------we");
        await Course.update(
          {
            coursePhotoId: findCoursePhoto[rand].id,
          },
          {
            where: {
              id: item.id,
            },
          }
        );
      }
    }

    return res.status(OK).send({ error: false });
  },

  findAll: async (req, res) => {
    const data = await CoursePhoto.findAll({
      order: [["updatedAt", "desc"]],
      include: [{ all: true }],
    });
    return res.status(OK).send({ error: false, data: data });
  },
};
