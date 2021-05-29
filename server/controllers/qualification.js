const Qualification = require("../models").Qualification;
const Query = new require("../utility/crud");

const { SERVER_ERROR, OK, VALIDATION_ERROR } = require("../utility/statusCode");
const query = new Query(Qualification);

module.exports = {
  create: async (req, res) => {
    const {
      hq_grade,
      hq_schoolName,
      hq_completed,
      hq_programmeYear,
      hq_qualification,
      userId,
      qualificationTypeId,
    } = req.body;

    const hasData = await Qualification.findOne({
      where: { userId },
    });

    let data;
    if (!hasData) {
      data = await query.add({
        hq_grade,
        hq_schoolName,
        hq_completed,
        hq_programmeYear,
        hq_qualification,
        userId,
        qualificationTypeId,
      });
    } else {
      data = await query.update(hasData.id, {
        hq_grade,
        hq_schoolName,
        hq_completed,
        hq_programmeYear,
        hq_qualification,
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
    // const id = req.params.id;
    // return query
    //   .findPK(id)
    //   .then((data) => res.status(OK).send({ error: false, data: data }))
    //   .catch((error) => res.status(SERVER_ERROR).send(error));
  },
  findByUser: async (req, res) => {
    const userId = req.body.userId;
    const data = await query.findOne({ userId });

    return res.status(OK).send({ error: false, data: data });
  },
  // update(req, res) {
  //   const {
  //     hq_grade,
  //     hq_schoolName,
  //     hq_completed,
  //     hq_programmeYear,
  //     hq_qualification,
  //     userId,
  //     qualificationTypeId,
  //   } = req.body;
  //   const id = req.params.id;
  //   return query
  //     .update(id, {
  //       hq_grade,
  //       hq_schoolName,
  //       hq_completed,
  //       hq_programmeYear,
  //       hq_qualification,
  //       userId,
  //       qualificationTypeId,
  //     })
  //     .then((data) => res.status(OK).send({ error: false, data: data }))
  //     .catch((error) => res.status(SERVER_ERROR).send(error));
  // },

  findAll(req, res) {
    return query
      .findAll()
      .then((data) => res.status(OK).send({ error: false, data: data }));
  },
};
