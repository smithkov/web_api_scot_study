const Document = require("../models").Document;
const Query = new require("../utility/crud");

const { SERVER_ERROR, OK, VALIDATION_ERROR } = require("../utility/statusCode");
const query = new Query(Document);

module.exports = {
  create: async (req, res) => {
    console.log(req.files.docs);
    const { name, userId } = req.body;
    let data;

    const documentObject = req.files.docs;

    const doc = documentObject ? documentObject[0].location : null;

    data = await query.add({
      name,
      url: doc || "",
      userId,
    });

    return res.status(OK).send({ data: data, error: false });
  },
  // delete(req, res) {
  //   const id = req.params.id;
  //   return query
  //     .delete(id)
  //     .then((data) => res.status(OK).send({ error: false, data: id }))
  //     .catch((error) => res.status(OK).send(error));
  // },

  findAllByUserId: async (req, res) => {
    const userId = req.body.userId;

    const data = await Document.findAll({ where: { userId } });
    return res.status(OK).send({ error: true, data: data });
  },
};
