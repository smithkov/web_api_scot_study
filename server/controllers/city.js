const City = require("../models").City;
const Query = new require("../utility/crud");

const { SERVER_ERROR, OK, VALIDATION_ERROR } = require("../utility/statusCode");
const query = new Query(City);

module.exports = {
  create(req, res) {
    const name = req.body.name;

    return query.add({ name: name }).then((city) => res.status(OK).send(city));
  },
  delete(req, res) {
    const id = req.params.id;
    return query
      .delete(id)
      .then((city) => res.status(OK).send({ error: false, data: id }))
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },

  findPk(req, res) {
    const id = req.params.id;
    return query
      .findPK(id)
      .then((city) => res.status(OK).send({ error: false, data: city }))
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },

  update(req, res) {
    const name = req.body.name;
    const id = req.params.id;
    return query
      .update(id, { name: name })
      .then((city) => res.status(OK).send({ error: false, data: city }))
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },

  findAll: async (req, res) => {
    const data = await City.findAll({
      order: [["name", "asc"]],
    });
    return res.status(OK).send({ error: false, data: data });
  },
};
