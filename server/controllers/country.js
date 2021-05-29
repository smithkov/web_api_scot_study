const Country = require("../models").Country;
const Query = new require("../utility/crud");

const { SERVER_ERROR, OK, VALIDATION_ERROR } = require("../utility/statusCode");
const query = new Query(Country);

module.exports = {
  create: async (req, res) => {
    const { name, code } = req.body;

    const data = await query.add({ name, code });

    return res.status(OK).send(data);
  },
  delete(req, res) {
    const id = req.params.id;
    return query
      .delete(id)
      .then((data) => res.status(OK).send({ error: false, data: id }))
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },

  findPk(req, res) {
    const id = req.params.id;
    return query
      .findPK(id)
      .then((data) => res.status(OK).send({ error: false, data: data }))
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },

  update(req, res) {
    const { name, code } = req.body;
    const id = req.params.id;
    return query
      .update(id, { name, code })
      .then((data) => res.status(OK).send({ error: false, data: data }))
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },

  findAll: async (req, res) => {
    const data = await Country.findAll({ order: [["name", "asc"]] });
    return res.status(OK).send({ error: false, data: data });
  },
};
