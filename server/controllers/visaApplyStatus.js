const VisaApplyStatus = require("../models").VisaApplyStatus;
const Query = new require("../utility/crud");

const { OK, VALIDATION_ERROR } = require("../utility/statusCode");
const query = new Query(VisaApplyStatus);

module.exports = {
  create(req, res) {
    const name = req.body.name;

    return query.add({ name }).then((data) => res.status(OK).send(data));
  },
  delete(req, res) {
    const id = req.params.id;
    return query
      .delete(id)
      .then((data) => res.status(OK).send({ error: false, data: id }))
      .catch((error) => res.status(OK).send(error));
  },

  findPk(req, res) {
    const id = req.params.id;
    return query
      .findPK(id)
      .then((data) => res.status(OK).send({ error: false, data: data }))
      .catch((error) => res.status(OK).send(error));
  },

  update(req, res) {
    const name = req.body.name;
    const id = req.params.id;
    return query
      .update(id, { name: name })
      .then((data) => res.status(OK).send({ error: false, data: data }))
      .catch((error) => res.status(OK).send(error));
  },

  findAll(req, res) {
    return query
      .findAll()
      .then((data) => res.status(OK).send({ error: false, data: data }));
  },
};
