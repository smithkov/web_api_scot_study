const Testimonial = require("../models").Testimonial;
const Query = new require("../utility/crud");

const { SERVER_ERROR, OK, VALIDATION_ERROR } = require("../utility/statusCode");
const query = new Query(Testimonial);

module.exports = {
  create: async (req, res) => {
    const { id, firstname, title, content } = req.body;
    let data;

    const photoObject = req.files.url;

    const photo = photoObject ? photoObject[0].location : null;
    if (id) {
      const findPhoto = await query.findPK(id);

      data = await query.update(id, {
        id,
        url: photo || findPhoto.url,
        firstname,
        title,
        content,
      });
    } else {
      data = await query.add({
        url: photo || "",
        firstname,
        title,
        content,
      });
    }
    return res.status(OK).send({ data: data, error: false });
  },
  delete(req, res) {
    const id = req.params.id;
    return query
      .delete(id)
      .then((data) => res.status(OK).send({ error: false, data: id }))
      .catch((error) => res.status(OK).send({ error: true }));
  },

  findPk(req, res) {
    const id = req.body.id;
    return query
      .findPK(id)
      .then((data) => res.status(OK).send({ error: false, data: data }))
      .catch((error) => res.status(OK).send(error));
  },

  findAll: async (req, res) => {
    const data = await Testimonial.findAll({
      order: [["updatedAt", "desc"]],
    });
    return res.status(OK).send({ error: false, data: data });
  },
};
