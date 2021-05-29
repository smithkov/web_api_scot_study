const VisaHistory = require("../models").VisaHistory;
const Query = new require("../utility/crud");

const { SERVER_ERROR, OK, VALIDATION_ERROR } = require("../utility/statusCode");
const query = new Query(VisaHistory);

module.exports = {
  create: async (req, res) => {
    const { hasApplied, purpose, hasRefused, reason, moreInfo, userId } =
      req.body;
    const hasData = await VisaHistory.findOne({
      where: { userId },
    });
    let data;

    if (!hasData)
      data = await query.add({
        hasApplied,
        purpose,
        hasRefused,
        reason,
        moreInfo,
        userId,
      });
    else
      await query.update(hasData.id, {
        hasApplied,
        purpose,
        hasRefused,
        reason,
        moreInfo,
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

  update(req, res) {
    const { hasApplied, purpose, hasRefused, reason, moreInfo, userId } =
      req.body;
    const id = req.params.id;
    return query
      .update(id, { hasApplied, purpose, hasRefused, reason, moreInfo, userId })
      .then((data) => res.status(OK).send({ error: false, data: data }))
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
      .then((data) => res.status(OK).send({ error: false, data: data }));
  },
};
