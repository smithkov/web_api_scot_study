const Gallery = require("../models").Gallery;

const Query = new require("../utility/crud");

const { SERVER_ERROR, OK, VALIDATION_ERROR } = require("../utility/statusCode");
const query = new Query(Gallery);

module.exports = {
  create: async (req, res) => {
    const { id } = req.body;
    let data;

    const photoObject = req.files.url;

    const photo = photoObject ? photoObject[0].location : null;
    if (id) {
      const findPhoto = await query.findPK(id);

      data = await query.update(id, {
        id,
        url: photo || findPhoto.url,
      });
    } else {
      data = await query.add({
        url: photo || "",
      });
    }
    return res.status(OK).send({ data: data, error: false });
  },

  delete(req, res) {
    const id = req.params.id;
    return query
      .delete(id)
      .then((city) => res.status(OK).send({ error: false, data: id }))
      .catch((error) => res.status(OK).send(error));
  },

  findPk(req, res) {
    const id = req.body.id;

    return query
      .findPK(id)
      .then((data) => res.status(OK).send({ error: false, data: data }))
      .catch((error) => res.status(OK).send({ error: true }));
  },

  findAll: async (req, res) => {
    const data = await Gallery.findAll();
    return res.status(OK).send({ error: false, data: data });
  },
};
