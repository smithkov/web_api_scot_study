const PhdApplication = require("../models").PhdApplication;
const PhdQualification = require("../models").PhdQualification;

const Query = new require("../utility/crud");

const { OK } = require("../utility/statusCode");
const query = new Query(PhdApplication);

module.exports = {
  create: async (req, res) => {
    const {
      firstname,
      middlename,
      lastname,
      email,
      phone,
      topic,
      phdQualificationId,
    } = req.body;
    const data = await query.add({
      firstname,
      middlename,
      lastname,
      email,
      phone,
      topic,
      phdQualificationId,
    });
    return res.status(OK).send({ data: data, error: false });
  },

  update: async (req, res) => {
    const id = req.params.id;
    const {
      firstname,
      middlename,
      lastname,
      email,
      phone,
      topic,
      qualificationId,
    } = req.body;

    const data = await query.update(id, {
      firstname,
      middlename,
      lastname,
      email,
      phone,
      topic,
      qualificationId,
    });

    return res.status(OK).send({ error: false, data: data });
  },
  delete(req, res) {
    const id = req.params.id;
    return query
      .delete(id)
      .then((data) => res.status(OK).send({ error: false, data: id }))
      .catch((error) => res.status(OK).send({ error: true, data: id }));
  },

  findPk: async (req, res) => {
    const id = req.body.id;

    const data = await PhdApplication.findByPk(id, {
      include: [
        {
          model: PhdQualification,
          as: "Qualification",
        },
      ],
    });
    return res.status(OK).send({ error: false, data });
  },

  findAll: async (req, res) => {
    const data = await PhdApplication.findAll({
      include: [
        {
          model: PhdQualification,
          as: "Qualification",
        },
      ],
      order: [["createdAt", "desc"]],
    });
    return res.status(OK).send({ error: false, data });
  },
};
