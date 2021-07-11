const CoursePhoto = require("../models").CoursePhoto;

const Query = new require("../utility/crud");

const { SERVER_ERROR, OK, VALIDATION_ERROR } = require("../utility/statusCode");
const query = new Query(CoursePhoto);

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

    findCourse.forEach(async (item) => {
      const findCoursePhoto = await CoursePhoto.findAll({
        where: { facultyId: item.FacultyId },
        include: [{ all: true }],
      });
      if (findCoursePhoto.length > 1) {
        const photoCount = findCoursePhoto.length - 1;
        const rand = Math.floor(Math.random() * (photoCount - 0 + 1)) + 0;

        const update = await courseQuery.update(item.id, {
          coursePhotoId: findCoursePhoto[rand].id,
        });
      }
    });

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
