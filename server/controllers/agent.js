const Agent = require("../models").Agent;
const Application = require("../models").Application;
const Role = require("../models").Role;
const User = require("../models").User;
const Country = require("../models").Country;
const DegreeType = require("../models").DegreeType;
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const Query = new require("../utility/crud");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const { SERVER_ERROR, OK, VALIDATION_ERROR } = require("../utility/statusCode");
const query = new Query(Agent);
const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1).toLocaleLowerCase();
};
module.exports = {
  verifyJWT: () => {},

  signUp: async (req, res) => {
    const { email, password, agencyName, phone, countryId } = req.body;

    const role = await Role.findOne({
      where: { name: "Agent" },
    });
    console.log("Role underneath");
    console.log(role);
    const isEmailExist = await Agent.findOne({
      where: { email },
    });

    if (isEmailExist) {
      return res.status(200).json({
        message: "Email already exist!",
        error: true,
      });
    }

    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        return res.status(500).json({
          error: err,
        });
      } else {
        const agent = await Agent.create({
          id: uuidv4(),
          email: email,
          password: hash,
          roleId: role.id,
          agencyName: agencyName,
          phone: phone,
          countryId: countryId,
        });
        const token = jwt.sign(
          {
            email: agent.email,
            userId: agent.id,
          },
          process.env.SECRET,
          {
            expiresIn: "12h",
          }
        );

        const findAgent = await Agent.findByPk(agent.id);

        return res.status(200).json({
          message: "Auth successful",
          token: token,
          error: false,

          data: findAgent,
        });
      }
    });
  },
  isLogin(req, res) {
    res.status(OK).send({ error: false, data: req.userData });
  },
  signIn: async (req, res) => {
    const { email, password } = req.body;

    const agent = await Agent.findOne({
      where: { email },
      include: [
        {
          model: Role,
          as: "role",
        },
      ],
    });

    if (agent) {
      bcrypt.compare(password, agent.password, async (err, result) => {
        if (err) {
          return res.status(200).json({
            message: "Email or password is incorrect",
            error: true,
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: agent.email,
              userId: agent.id,
            },
            process.env.SECRET,
            {
              expiresIn: "12h",
            }
          );

          return res.status(200).json({
            message: "Auth successful",
            token: token,
            error: false,
            isAdmin: agent.role.name == "Agent" ? false : true,
            data: agent,
          });
        }

        res.status(200).json({
          message: "Auth failed",
          error: true,
        });
      });
    } else {
      res.status(200).json({
        message: "Your email or password is incorrect",
        error: true,
      });
    }
  },
  agentById: async (req, res) => {
    const agentId = req.body.agentId;
    const data = await Agent.findOne({
      where: { id: agentId },
      include: [
        {
          model: Country,
          as: "country",
        },
      ],
    });
    res.status(OK).send({
      error: false,
      data: data,
    });
  },
  // findPk(req, res) {
  //   const id = req.params.id;
  //   return query
  //     .findPK(id)
  //     .then((faculty) => res.status(OK).send({ error: false, data: faculty }))
  //     .catch((error) => res.status(SERVER_ERROR).send(error));
  // },

  update: async (req, res) => {
    const { phone, agencyName, email, countryId } = req.body;
    const id = req.params.id;

    const data = await Agent.update(
      {
        phone,
        email,
        agencyName,
        countryId,
      },
      {
        where: {
          id: id,
        },
      }
    );

    return res
      .status(OK)
      .send({ error: false, data: data, message: "Updated successfully" });
  },

  //Below function adds users under agents
  AddUser: async (req, res) => {
    try {
      const {
        firstname,
        lastname,
        middlename,
        dob,
        gender,
        marital,
        homeAddress,
        postalAddress,
        phone,
        countryId,
        agentId,
      } = req.body;
      const findAgent = await Agent.findByPk(agentId);
      const email = findAgent.email;
      const user = await User.create({
        id: uuidv4(),
        firstname: capitalize(firstname),
        middlename: capitalize(middlename),
        lastname: capitalize(lastname),
        dob,
        gender,
        email: email,
        contactEmail: email,
        marital,
        homeAddress,
        postalAddress,
        phone,
        countryId,
        agentId,
      });

      return res.status(200).json({
        message: "Auth successful",
        error: false,
      });
    } catch (err) {
      return res.status(200).json({
        message: "Registration was not successful",
        error: true,
      });
    }
  },

  findAllAgent: async (req, res) => {
    const limit = req.body.limit;

    const data = await Agent.findAll({
      limit: limit ? limit : 30,
      order: [["updatedAt", "desc"]],
      include: [{ all: true }],
      subQuery: false,
    });
    return res.status(OK).send({ error: false, data: data });
  },
  findAllUsersByAgent: async (req, res) => {
    const agentId = req.body.agentId;

    const data = await User.findAll({
      where: { agentId },
      order: [["updatedAt", "desc"]],
      include: [{ all: true }],
    });
    return res.status(OK).send({ error: false, data: data });
  },

  findAgentApplications: async (req, res) => {
    const agentId = req.body.agentId;
    const limit = req.body.limit;
    const data = await Application.findAll({
      order: [["updatedAt", "desc"]],
      limit: limit ? limit : 40,
      include: [
        {
          model: User,
          as: "User",
          where: { agentId: agentId },
        },
        {
          model: DegreeType,
          as: "DegreeType",
        },
      ],
    });

    const count = await Application.findAndCountAll({
      include: [
        {
          model: User,
          as: "User",
          where: { agentId: agentId },
        },
      ],
    });
    return res
      .status(OK)
      .send({ error: false, data: data, count: count.count });
  },
};
