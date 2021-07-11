const Faculty = require("../models").Faculty;
const CoursePhoto = require("../models").CoursePhoto;
const Course = require("../models").Course;
const Institution = require("../models").Institution;
const Query = new require("../utility/crud");

const { SERVER_ERROR, OK, VALIDATION_ERROR } = require("../utility/statusCode");
const query = new Query(Faculty);

module.exports = {
  create(req, res) {
    const name = req.body.name;

    return query
      .add({ name: name })
      .then((faculty) => res.status(OK).send(faculty));
  },
  delete(req, res) {
    const id = req.params.id;
    return query
      .delete(id)
      .then((faculty) => res.status(OK).send({ error: false, data: id }))
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },

  findPk(req, res) {
    const id = req.params.id;
    return query
      .findPK(id)
      .then((faculty) => res.status(OK).send({ error: false, data: faculty }))
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },

  update(req, res) {
    const name = req.body.name;
    const id = req.params.id;
    return query
      .update(id, { name: name })
      .then((faculty) => res.status(OK).send({ error: false, data: faculty }))
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },

  findAll(req, res) {
    return query
      .findAll()
      .then((faculty) => res.status(OK).send({ error: false, data: faculty }));
  },

  findAllLight: async (req, res) => {
    const data = await Faculty.findAll({
      include: [
        {
          model: CoursePhoto,
          as: "CoursePhotos",
        },
      ],
    });
    return res.status(OK).send({ error: false, data: data });
  },

  coursesForHome: async (req, res) => {
    const business = await Course.findAll({
      where: { facultyId: "250d2d75-7e69-49fa-8234-1cd565f57376" },
      include: [
        {
          model: Institution,
          as: "Institution",
        },
        {
          model: CoursePhoto,
          as: "CoursePhoto",
        },
        {
          model: Faculty,
          as: "Faculty",
        },
        {
          model: CoursePhoto,
          as: "CoursePhoto",
        },
      ],
      limit: 3,
      subQuery: false,
    });
    const engineer = await Course.findAll({
      where: { facultyId: "36f19d62-ca16-4392-afc3-f6253d2da620" },
      include: [
        {
          model: Institution,
          as: "Institution",
        },
        {
          model: Faculty,
          as: "Faculty",
        },
        {
          model: CoursePhoto,
          as: "CoursePhoto",
        },
      ],
      limit: 3,
      subQuery: false,
    });

    const health = await Course.findAll({
      where: { facultyId: "3ef55fdd-6c8e-419f-9196-6053794b4095" },
      include: [
        {
          model: Institution,
          as: "Institution",
        },
        {
          model: Faculty,
          as: "Faculty",
        },
        {
          model: CoursePhoto,
          as: "CoursePhoto",
        },
      ],
      limit: 3,
      subQuery: false,
    });

    const media = await Course.findAll({
      where: { facultyId: "48478e98-42a6-4f08-9e49-8317870bfb44" },
      include: [
        {
          model: Institution,
          as: "Institution",
        },
        {
          model: Faculty,
          as: "Faculty",
        },
        {
          model: CoursePhoto,
          as: "CoursePhoto",
        },
      ],
      limit: 3,
      subQuery: false,
    });

    const medicine = await Course.findAll({
      where: { facultyId: "4d9d1262-450a-4eb9-a6a4-cff838af42d1" },
      include: [
        {
          model: Institution,
          as: "Institution",
        },
        {
          model: Faculty,
          as: "Faculty",
        },
        {
          model: CoursePhoto,
          as: "CoursePhoto",
        },
      ],
      limit: 3,
      subQuery: false,
    });

    const nursing = await Course.findAll({
      where: { facultyId: "7fb12650-7615-4614-bbf2-797d885c7c40" },
      include: [
        {
          model: Institution,
          as: "Institution",
        },
        {
          model: Faculty,
          as: "Faculty",
        },
        {
          model: CoursePhoto,
          as: "CoursePhoto",
        },
      ],
      limit: 3,
      subQuery: false,
    });

    const computing = await Course.findAll({
      where: { facultyId: "8d246951-4b16-44f6-8cfa-8bd736742825" },
      include: [
        {
          model: Institution,
          as: "Institution",
        },
        {
          model: Faculty,
          as: "Faculty",
        },
        {
          model: CoursePhoto,
          as: "CoursePhoto",
        },
      ],
      limit: 3,
      subQuery: false,
    });

    const social = await Course.findAll({
      where: { facultyId: "a2059529-8766-4dd4-9bbb-dfa8f2540cc5" },
      include: [
        {
          model: Institution,
          as: "Institution",
        },
        {
          model: Faculty,
          as: "Faculty",
        },
        {
          model: CoursePhoto,
          as: "CoursePhoto",
        },
      ],
      limit: 3,
      subQuery: false,
    });

    const data = business.concat(
      engineer,
      health,
      media,
      medicine,
      nursing,
      computing,
      social
    );
    res.status(OK).send({
      data,
    });
  },
};
