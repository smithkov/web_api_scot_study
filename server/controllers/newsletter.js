const Newsletter = require("../models").Newletter;
const Query = new require("../utility/crud");

const { SERVER_ERROR, OK, VALIDATION_ERROR } = require("../utility/statusCode");
const query = new Query(Newsletter);

module.exports = {
  create: async (req, res) => {
    const { name, email } = req.body;
    const findNewsLetter = await Newsletter.findOne({ email });
    if (findNewsLetter) {
      return res.status(OK).send({ data: data, error: true });
    }
    const data = await query.add({ name, email });

    return res.status(OK).send({ data: data, error: false });
  },

  findPk(req, res) {
    const id = req.params.id;
    return query
      .findPK(id)
      .then((data) => res.status(OK).send({ error: false, data: data }))
      .catch((error) => res.status(OK).send(error));
  },

  findAll: async (req, res) => {
    const data = await Newsletter.findAll({
      order: [["createdAt", "desc"]],
    });
    return res.status(OK).send({ error: false, data: data });
  },
};
