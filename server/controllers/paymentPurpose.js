const PaymentPurpose = require("../models").PaymentPurpose;
const Query = new require("../utility/crud");

const { OK } = require("../utility/statusCode");
const query = new Query(PaymentPurpose);

module.exports = {
  create: async (req, res) => {
    const { name } = req.body;

    const data = await query.add({ name });

    return res.status(OK).send(data);
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
    const { name, code } = req.body;
    const id = req.params.id;
    return query
      .update(id, { name, code })
      .then((data) => res.status(OK).send({ error: false, data: data }))
      .catch((error) => res.status(OK).send(error));
  },

  findAll: async (req, res) => {
    const data = await PaymentPurpose.findAll({ order: [["serial", "asc"]] });
    return res.status(OK).send({ error: false, data: data });
  },
};
