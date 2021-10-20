const Application = require("../models").Application;
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const User = require("../models").User;
const DegreeType = require("../models").DegreeType;
const Decision = require("../models").Decision;
const Agent = require("../models").Agent;
const Document = require("../models").Document;
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
        regDate: new Date().toString(),
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
      console.log("---------------------------user email");
      console.log(findUser.email);
      console.log("---------------------------user email");
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
      .update(id, { canShow: false })
      .then((application) =>
        res.status(OK).send({ error: false, data: application })
      )
      .catch((error) => res.status(SERVER_ERROR).send(error));
  },

  findAllByuser: async (req, res) => {
    const userId = req.body.userId;
    const data = await Application.findAll({
      where: { userId, canShow: true },
      include: [{ all: true }],
    });
    return res.status(OK).send({ error: false, data: data });
  },

  findOneByuser: async (req, res) => {
    const userId = req.body.userId;
    const data = await Application.findOne({
      where: { userId, canShow: true },
      include: [{ all: true }],
    });
    return res.status(OK).send({ error: false, data: data });
  },

  findById: async (req, res) => {
    const id = req.body.id;
    const data = await Application.findOne({
      where: { id, canShow: true },
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
    console.log(req.body);
    const id = req.params.id;
    const obj = {
      hasPaid,
      eligibilityCheck,
      hasCAS,
      hasDecided,
    };
    if (decisionId != "") {
      console.log("enter decision");
      obj.decisionId = decisionId;
    }
    if (visaApplyStatusId != "") {
      obj.visaApplyStatusId = visaApplyStatusId;
    }
    return query.update(id, obj).then((application) =>
      res.status(OK).send({
        error: false,
        data: application,
        message: "Updated successfully",
      })
    );
    // .catch((error) =>
    //   res.status(OK).send({ error: true, message: "Could not be updated!" })
    // );
  },

  findAll: async (req, res) => {
    const { offset, limit, search } = req.body;
    let dataObject = {};
    let dataObj = {};
    let hasData = false;
    if (offset !== "" && offset != 0) {
      hasData = true;
    }
    if (search != "") {
      hasData = true;
      dataObject = {
        canShow: true,
        [Op.or]: [
          { firstname: { [Op.like]: `%${search}%` } },
          { lastname: { [Op.like]: `%${search}%` } },
          { email: { [Op.like]: `%${search}%` } },
        ],
      };

      // dataObject.lastname = { [Op.like]: `%${search}%` };
    }

    //const hasData = Object.keys(dataObject).length;
    let data;
    if (hasData) {
      console.log("-------------------------------------------1st");
      data = await Application.findAll({
        where: { canShow: true },
        limit,
        offset,
        order: [["createdAt", "desc"]],
        include: [
          {
            model: User,
            as: "User",
            required: true,
            where: dataObject,
            include: [
              {
                model: Agent,
                as: "Agent",
              },
              // {
              //   model: Document,
              // },
            ],
          },
          {
            model: DegreeType,
            as: "DegreeType",
          },
          {
            model: Decision,
            as: "Decision",
          },
        ],
        subQuery: false,
      });
    } else {
      console.log("-------------------------------------------2nd");
      data = await Application.findAll({
        where: { canShow: true },
        limit: 10,
        order: [["createdAt", "desc"]],
        include: [
          {
            model: User,
            as: "User",
            required: true,
            where: { canShow: true },
            include: [
              {
                model: Agent,
                as: "Agent",
              },
              // {
              //   required: false,
              //   model: Document,
              //   as: "Documents",
              // },
            ],
          },
          {
            model: DegreeType,
            as: "DegreeType",
          },
          {
            model: Decision,
            as: "Decision",
          },
        ],
        subQuery: false,
      });
    }
    return res.status(OK).send({ error: false, data: data });
  },
  findAllForDashboard: async (req, res) => {
    const data = await Application.findAll({
      where: { canShow: true },
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
