const Contact = require("../models").Contact;
const Query = new require("../utility/crud");

const { SERVER_ERROR, OK, VALIDATION_ERROR } = require("../utility/statusCode");
const query = new Query(Contact);

module.exports = {
  create: async (req, res) => {
    const { fullname, subject, email, message } = req.body;

    const data = await query.add({ fullname, subject, email, message });
    res.status(OK).send({ data: data, error: false });
  },

  findPk(req, res) {
    const id = req.params.id;
    return query
      .findPK(id)
      .then((data) => res.status(OK).send({ error: false, data: data }))
      .catch((error) => res.status(OK).send(error));
  },

  findAll: async (req, res) => {
    const data = await Contact.findAll({
      order: [["createdAt", "desc"]],
    });
    return res.status(OK).send({ error: false, data: data });
  },
};
