const Faculty = require("../models").Faculty;
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
};
