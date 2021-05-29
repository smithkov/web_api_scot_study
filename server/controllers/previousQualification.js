const PreviousQualification = require("../models").PreviousQualification;
const Query = new require("../utility/crud");

const { SERVER_ERROR, OK, VALIDATION_ERROR } = require("../utility/statusCode");
const query = new Query(PreviousQualification);

module.exports = {
  create: async (req, res) => {
    const {
      pq_grade,
      pq_schoolName,
      pq_completed,
      pq_programmeYear,
      pq_qualification,
      userId,
      qualificationTypeId,
    } = req.body;

    const hasData = await PreviousQualification.findOne({
      where: { userId },
    });

    let data;
    if (!hasData) {
      data = await query.add({
        pq_grade,
        pq_schoolName,
        pq_completed,
        pq_programmeYear,
        pq_qualification,
        userId,
        qualificationTypeId,
      });
    } else {
      data = await query.update(hasData.id, {
        pq_grade,
        pq_schoolName,
        pq_completed,
        pq_programmeYear,
        pq_qualification,
        userId,
        qualificationTypeId,
      });
    }
    return res
      .status(OK)
      .send({ data: data, error: false, message: "Saved successfully." });
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
    const {
      pq_grade,
      pq_schoolName,
      pq_completed,
      pq_programmeYear,
      pq_qualification,
      userId,
      qualificationTypeId,
    } = req.body;
    const id = req.params.id;
    return query
      .update(id, {
        pq_grade,
        pq_schoolName,
        pq_completed,
        pq_programmeYear,
        pq_qualification,
        userId,
        qualificationTypeId,
      })
      .then((data) => res.status(OK).send({ error: false, data: data }))
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },

  findAll(req, res) {
    return query
      .findAll()
      .then((data) => res.status(OK).send({ error: false, data: data }));
  },
};
