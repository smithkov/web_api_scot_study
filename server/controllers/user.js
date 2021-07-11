const User = require("../models").User;
const Role = require("../models").Role;
const Country = require("../models").Country;
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const Query = new require("../utility/crud");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const { SERVER_ERROR, OK, VALIDATION_ERROR } = require("../utility/statusCode");
const query = new Query(User);
const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1).toLocaleLowerCase();
};
module.exports = {
  verifyJWT: () => {},

  signUp: async (req, res) => {
    const {
      email,
      password,
      firstname,
      lastname,
      middlename,
      dob,
      gender,
      marital,
      homeAddress,
      postalAddress,
      contactEmail,
      phone,
      countryId,
    } = req.body;

    const role = await Role.findOne({
      where: { name: "User" },
    });
    const isEmailExist = await User.findOne({
      where: { email },
    });

    const isContactEmailExist = await User.findOne({
      where: { contactEmail },
    });
    if (isEmailExist) {
      return res.status(200).json({
        message: "Email already exist!",
        error: true,
      });
    }

    if (isContactEmailExist) {
      return res.status(200).json({
        message: "Contact email already exist!",
        error: true,
      });
    }
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        return res.status(500).json({
          error: err,
        });
      } else {
        const user = await User.create({
          id: uuidv4(),
          email,
          password: hash,
          roleId: role.id,
          firstname: capitalize(firstname),
          middlename: capitalize(middlename),
          lastname: capitalize(lastname),
          dob,
          gender,
          marital,
          homeAddress,
          postalAddress,
          contactEmail,
          phone,
          countryId,
        });
        const token = jwt.sign(
          {
            email: user.email,
            userId: user.id,
          },
          process.env.SECRET,
          {
            expiresIn: "12h",
          }
        );
        const findUser = await User.findByPk(user.id, {
          include: [{ all: true }],
        });
        return res.status(200).json({
          message: "Auth successful",
          token: token,
          error: false,
          isAdmin: findUser.Role.name == "User" ? false : true,
          data: findUser,
        });
      }
    });
  },
  isLogin(req, res) {
    res.status(OK).send({ error: false, data: req.userData });
  },
  signIn: async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: { email },
    });
    if (user) {
      bcrypt.compare(password, user.password, async (err, result) => {
        if (err) {
          return res.status(200).json({
            message: "Email or password is incorrect",
            error: true,
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user.email,
              userId: user.id,
            },
            process.env.SECRET,
            {
              expiresIn: "12h",
            }
          );
          const findUser = await User.findByPk(user.id, {
            include: [{ all: true }],
          });

          const lastLoginUpdate = await User.update(
            { email: user.email },
            { where: { id: user.id } }
          );

          return res.status(200).json({
            message: "Auth successful",
            token: token,
            error: false,
            isAdmin: findUser.Role.name == "User" ? false : true,
            data: findUser,
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
  userById: async (req, res) => {
    const userId = req.body.userId;
    const data = await User.findOne({
      where: { id: userId },
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
    const {
      phone,
      firstname,
      middlename,
      lastname,
      marital,
      gender,
      dob,
      homeAddress,
      postalAddress,
      contactEmail,
      countryId,
    } = req.body;
    const id = req.params.id;

    const data = await User.update(
      {
        phone,
        firstname,
        middlename,
        lastname,
        marital,
        gender,
        dob,
        homeAddress,
        postalAddress,
        contactEmail,
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

  findAll: async (req, res) => {
    const data = await User.findAll({
      order: [["updatedAt", "desc"]],
      include: [{ all: true }],
    });
    return res.status(OK).send({ error: false, data: data });
  },
};
