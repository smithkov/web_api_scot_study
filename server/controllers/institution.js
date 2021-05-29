const Institution = require("../models").Institution;
const Query = new require("../utility/crud");

const { SERVER_ERROR, OK, VALIDATION_ERROR } = require("../utility/statusCode");
const query = new Query(Institution);

module.exports = {
  create: async (req, res) => {
    const { name, about, sellingPoint, cityId, id } = req.body;
    let data;
    const logoObject = req.files.logo;
    const bannerObject = req.files.banner;

    const logo = logoObject ? logoObject[0].location : null;
    const banner = bannerObject ? bannerObject[0].location : null;
    if (id) {
      const findInstitution = await query.findPK(id);
      data = await query.update(id, {
        id,
        name,
        about,
        sellingPoint,
        banner: banner || findInstitution.banner,
        logo: logo || findInstitution.logo,
        cityId,
      });
    } else {
      data = await query.add({
        name,
        about,
        sellingPoint,
        banner: banner || "",
        logo: logo || "",
        cityId,
      });
    }
    return res.status(OK).send({ data: data, error: false });
  },
  delete(req, res) {
    const id = req.params.id;
    return query
      .delete(id)
      .then((institution) => res.status(OK).send({ error: false, data: id }))
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },

  findPk(req, res) {
    const id = req.body.id;
    return query
      .findPK(id)
      .then((institution) =>
        res.status(OK).send({ error: false, data: institution })
      )
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },

  update(req, res) {
    const name = req.body.name;
    const id = req.params.id;
    return query
      .update(id, { name: name })
      .then((institution) =>
        res.status(OK).send({ error: false, data: institution })
      )
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },

  findAll: async (req, res) => {
    const data = await Institution.findAll({
      order: [["name", "asc"]],
      include: [{ all: true }],
    });
    return res.status(OK).send({ error: false, data: data });
  },

  findAllLighter: async (req, res) => {
    const institution = await Institution.findAll({
      order: [["name", "asc"]],
      include: [{ all: true }],
    });
    return res.status(OK).send({ error: false, data: institution });
  },
};
