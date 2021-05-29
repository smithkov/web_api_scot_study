const Sponsorship = require("../models").Sponsorship;
const Query = new require("../utility/crud");

const { SERVER_ERROR, OK, VALIDATION_ERROR } = require("../utility/statusCode");
const query = new Query(Sponsorship);

module.exports = {
  create: async (req, res) => {
    const { sponsor, name, occupation, budget, userId } = req.body;
    const hasData = await Sponsorship.findOne({
      where: { userId },
    });
    let data;
    if (!hasData)
      data = await query.add({ sponsor, name, occupation, budget, userId });
    else
      await query.update(hasData.id, {
        sponsor,
        name,
        occupation,
        budget,
        userId,
      });

    return res
      .status(OK)
      .send({ data: data, error: false, message: "Saved successfully" });
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
    const { sponsor, name, occupation, budget, userId } = req.body;
    const id = req.params.id;
    return query
      .update(id, { sponsor, name, occupation, budget, userId })
      .then((faculty) => res.status(OK).send({ error: false, data: faculty }))
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },
  findByUser: async (req, res) => {
    const userId = req.body.userId;
    const data = await query.findOne({ userId });

    return res.status(OK).send({ error: false, data: data });
  },
  findAll(req, res) {
    return query
      .findAll()
      .then((faculty) => res.status(OK).send({ error: false, data: faculty }));
  },
};
