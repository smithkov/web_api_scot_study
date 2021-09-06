const Application = require("../models").Application;
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const User = require("../models").User;
const DegreeType = require("../models").DegreeType;
const Agent = require("../models").Agent;
const Query = new require("../utility/crud");
const Op = require("sequelize").Op;

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
    try {
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

      const findUser = await User.findByPk(userId, {
        include: [{ all: true }],
      });
      const msg = {
        to: findUser.email,
        from: "info@scotstudy.co.uk",
        templateId: "d-083f2e41311744d190c62b9abbfe3db4",
        dynamic_template_data: {
          name: findUser.firstname,
        },
      };

      sgMail.send(msg, (error, result) => {
        if (error) {
          console.log(error);
        } else {
          console.log("That's wassup!");
        }
      });
      return res
        .status(OK)
        .send({ error: false, data: data, message: "Saved successfully" });
    } catch (err) {
      return res
        .status(OK)
        .send({ error: true, data: data, message: "Saved successfully" });
    }
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

  findById: async (req, res) => {
    const id = req.body.id;
    const data = await Application.findOne({
      where: { id },
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
    const {
      hasPaid,
      eligibilityCheck,
      hasCAS,
      hasDecided,
      decisionId,
      visaApplyStatusId,
    } = req.body;

    const id = req.params.id;
    return query
      .update(id, {
        hasPaid,
        eligibilityCheck,
        hasCAS,
        hasDecided,
        decisionId,
        visaApplyStatusId,
      })
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
    const { offset, limit, search, refSearch } = req.body;
    let dataObject = {};
    let dataObj = {};
    console.log(req.body);
    if (search != "") {
      dataObject = {
        [Op.or]: [
          { firstname: { [Op.like]: `%${search}%` } },
          { lastname: { [Op.like]: `%${search}%` } },
        ],
      };

      // dataObject.lastname = { [Op.like]: `%${search}%` };
    }
    if (refSearch != "") {
      dataObj.refNo = { [Op.like]: `%${refSearch}%` };
    }
    //const hasData = Object.keys(dataObject).length;
    let data;
    if (dataObject) {
      data = await Application.findAll({
        where: dataObj,
        limit,
        offset,
        order: [["createdAt", "desc"]],
        include: [
          {
            model: User,
            as: "User",
            where: dataObject,
            include: [
              {
                model: Agent,
                as: "Agent",
              },
            ],
          },
          {
            model: DegreeType,
            as: "DegreeType",
          },
        ],
        subQuery: false,
      });
    } else {
      data = await Application.findAll({
        limit: limit,
        order: [["createdAt", "desc"]],
        include: [
          {
            model: User,
            as: "User",
            include: [
              {
                model: Agent,
                as: "Agent",
              },
            ],
          },
          {
            model: DegreeType,
            as: "DegreeType",
          },
        ],
        subQuery: false,
      });
    }
    return res.status(OK).send({ error: false, data: data });
  },
  findAllForDashboard: async (req, res) => {
    const data = await Application.findAll({
      order: [["createdAt", "desc"]],
      limit: 8,
      include: [
        {
          model: User,
          as: "User",
          include: [
            {
              model: Agent,
              as: "Agent",
            },
          ],
        },
        {
          model: DegreeType,
          as: "DegreeType",
        },
      ],
    });
    return res.status(OK).send({ error: false, data: data });
  },
};
