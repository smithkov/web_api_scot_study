const PhdQualification = require("../models").PhdQualification;

const Query = new require("../utility/crud");

const { OK } = require("../utility/statusCode");
const query = new Query(PhdQualification);

module.exports = {
  create: async (req, res) => {
    const { name } = req.body;
    const data = await query.add({
      name,
    });
    return res.status(OK).send({ data: data, error: false });
  },

  update: async (req, res) => {
    const id = req.params.id;
    const { name } = req.body;

    const data = await query.update(id, {
      name,
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

    const data = await PhdQualification.findByPk(id);
    return res.status(OK).send({ error: false, data });
  },

  findAll: async (req, res) => {
    const data = await PhdQualification.findAll();
    return res.status(OK).send({ error: false, data });
  },
};
