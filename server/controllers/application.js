const Application = require("../models").Application;
const Query = new require("../utility/crud");

const { SERVER_ERROR, OK, VALIDATION_ERROR } = require("../utility/statusCode");
const query = new Query(Application);
function randNumber() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const rand1 = alphabet[Math.floor(Math.random() * alphabet.length)];

  const rand2 = alphabet[Math.floor(Math.random() * alphabet.length)];
  const randNum = Math.floor(100000 + Math.random() * 900000);

  return `${rand1}${rand2}${randNum}`;
}
module.exports = {
  create: async (req, res) => {
    const {
      courseOne,
      courseTwo,
      degreeTypeId,
      institutionOne,
      institutionTwo,
      userId,
    } = req.body;

    const data = await query.add({
      courseOne,
      courseTwo,
      degreeTypeId,
      institutionOne,
      institutionTwo,
      userId,
      refNo: randNumber(),
    });

    return res
      .status(OK)
      .send({ error: false, data: data, message: "Saved successfully" });
  },
  delete(req, res) {
    const id = req.params.id;
    return query
      .delete(id)
      .then((application) => res.status(OK).send({ error: false, data: id }))
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },

  findAllByuser: async (req, res) => {
    const userId = req.body.userId;
    const data = await Application.findAll({
      where: { userId },
      include: [{ all: true }],
    });
    return res.status(OK).send({ error: false, data: data });
  },

  findOneByuser: async (req, res) => {
    const userId = req.body.userId;
    const data = await Application.findOne({
      where: { userId },
      include: [{ all: true }],
    });
    return res.status(OK).send({ error: false, data: data });
  },

  update(req, res) {
    const name = req.body.name;
    const id = req.params.id;
    return query
      .update(id, { name: name })
      .then((application) =>
        res.status(OK).send({ error: false, data: application })
      )
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },

  decisionUpdate(req, res) {
    const { hasPaid, eligibilityCheck, hasCAS, hasDecided, decisionId } =
      req.body;
    const id = req.params.id;
    return query
      .update(id, { hasPaid, eligibilityCheck, hasCAS, hasDecided, decisionId })
      .then((application) =>
        res.status(OK).send({
          error: false,
          data: application,
          message: "Updated successfully",
        })
      )
      .catch((error) =>
        res.status(OK).send({ error: true, message: "Could not be updated!" })
      );
  },

  findAll: async (req, res) => {
    const data = await Application.findAll({
      order: [["createdAt", "desc"]],
      include: [{ all: true }],
    });
    return res.status(OK).send({ error: false, data: data });
  },
};
