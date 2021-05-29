const HighSchoolQualification = require("../models").HighSchoolQualification;
const Query = new require("../utility/crud");

const { SERVER_ERROR, OK, VALIDATION_ERROR } = require("../utility/statusCode");
const query = new Query(HighSchoolQualification);

module.exports = {
  create: async (req, res) => {
    const { highSchoolName, completionYear, userId } = req.body;
    const hasData = await HighSchoolQualification.findOne({
      where: { userId },
    });
    let data;

    if (!hasData)
      data = await query.add({ highSchoolName, completionYear, userId });
    else
      await query.update(hasData.id, {
        highSchoolName,
        completionYear,
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
  findByUser: async (req, res) => {
    const userId = req.body.userId;
    const data = await query.findOne({ userId });

    return res.status(OK).send({ error: false, data: data });
  },
  update(req, res) {
    const { highSchoolName, completionYear, userId } = req.body;
    const id = req.params.id;
    return query
      .update(id, { highSchoolName, completionYear, userId })
      .then((data) => res.status(OK).send({ error: false, data: data }))
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },

  findAll(req, res) {
    return query
      .findAll()
      .then((data) => res.status(OK).send({ error: false, data: data }));
  },
};
