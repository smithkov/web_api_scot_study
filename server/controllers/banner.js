const Banner = require("../models").Banner;
const Query = new require("../utility/crud");

const { SERVER_ERROR, OK, VALIDATION_ERROR } = require("../utility/statusCode");
const query = new Query(Banner);

module.exports = {
  create: async (req, res) => {
    const { title, id } = req.body;
    let data;

    const bannerObject = req.files.url;

    const banner = bannerObject ? bannerObject[0].location : null;
    if (id) {
      const findBanner = await query.findPK(id);

      data = await query.update(id, {
        id,
        title,
        url: banner || findBanner.url,
      });
    } else {
      data = await query.add({
        title,
        url: banner || "",
      });
    }
    return res.status(OK).send({ data: data, error: false });
  },
  delete(req, res) {
    const id = req.params.id;
    return query
      .delete(id)
      .then((data) => res.status(OK).send({ error: false, data: id }))
      .catch((error) => res.status(OK).send(error));
  },

  findPk(req, res) {
    const id = req.body.id;

    return query
      .findPK(id)
      .then((data) => res.status(OK).send({ error: false, data: data }))
      .catch((error) => res.status(OK).send({ error: true }));
  },

  update(req, res) {
    const { title, url } = req.body;
    const id = req.params.id;
    return query
      .update(id, { title, url })
      .then((data) => res.status(OK).send({ error: false, data: data }))
      .catch((error) => res.status(OK).send(error));
  },

  findAll(req, res) {
    return query
      .findAll()
      .then((data) => res.status(OK).send({ error: false, data: data }));
  },
};
