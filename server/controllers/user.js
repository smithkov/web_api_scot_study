const User = require("../models").User;
const sgMail = require("@sendgrid/mail");
const Op = require("sequelize").Op;
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const Document = require("../models").Document;
const Relationship = require("../models").Relationship;
const Sponsorship = require("../models").Sponsorship;
const Decision = require("../models").Decision;
const VisaHistory = require("../models").VisaHistory;
const PreviousQualification = require("../models").PreviousQualification;
const Application = require("../models").Application;
const EnglishTest = require("../models").EnglishTest;
const Qualification = require("../models").Qualification;
const QualificationType = require("../models").QualificationType;
const HighSchool = require("../models").HighSchoolQualification;

const Role = require("../models").Role;
const Country = require("../models").Country;
const bcrypt = require("bcryptjs");
const axios = require("axios");
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
function randNumber() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const rand1 = alphabet[Math.floor(Math.random() * alphabet.length)];

  const rand2 = alphabet[Math.floor(Math.random() * alphabet.length)];
  const randNum = Math.floor(100000 + Math.random() * 900000);

  return `${rand1}${rand2}${randNum}`;
}
const validateEmail = (mail) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }

  return false;
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
    bcrypt.genSalt(4, async function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        const newPassword = hash;
        // create that user as no one by that username exists
        if (err) {
          return res.status(500).json({
            error: err,
          });
        } else {
          const user = await User.create({
            id: uuidv4(),
            regDate: new Date().toString(),
            email,
            password: newPassword,
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

          const msg = {
            to: email,
            from: "info@scotstudy.co.uk",
            templateId: "d-903614e610444ca09fb6ad86e99f1dd0",
            dynamic_template_data: {
              name: firstname,
            },
          };

          sgMail.send(msg, (error, result) => {
            if (error) {
              console.log(error);
            } else {
              console.log("That's wassup!");
            }
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
    });
  },
  isLogin(req, res) {
    res.status(OK).send({ error: false, data: req.userData });
  },

  signIn: async (req, res) => {
    const { email, password } = req.body;

    const isEmail = validateEmail(email);
    const user = await User.findOne({
      where: isEmail
        ? { email: email, canShow: true }
        : { username: email, canShow: true },
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
          console.log(findUser);
          const role = findUser.Role;
          return res.status(200).json({
            message: "Auth successful",
            token: token,
            error: false,
            isAdmin: role && role.name == "Admin" ? true : false,
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
      where: { id: userId, canShow: true },
      include: [
        {
          model: Country,
          as: "country",
        },
        {
          model: Document,
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
    const { offset, limit, search } = req.body;

    let dataObj = "";
    let hasData = false;
    console.log(req.body);
    if (search != "") {
      hasData = true;
      dataObj = {
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
      console.log("------------------------------------------------");
      data = await User.findAll({
        where: dataObj,
        limit,
        offset,
        order: [["createdAt", "desc"]],
        subQuery: false,
      });
    } else {
      console.log(
        "--------------------------rrrrrrrrrrrrrrrrrrrrrrrr----------------------"
      );
      data = await User.findAll({
        where: { canShow: true },
        limit,
        offset,
        order: [["createdAt", "desc"]],
        subQuery: false,
      });
    }
    return res.status(OK).send({ error: false, data: data });
  },

  forgotPassword: async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });

    if (user) {
      const token = uuidv4();
      const date = new Date();

      const userData = {
        expiryDate: date.setDate(date.getDate() + 1),
        forgotToken: token,
      };
      await User.update(userData, {
        where: {
          id: user.id,
        },
      });

      const msg = {
        to: email,
        from: "info@scotstudy.co.uk",
        templateId: "d-0e7c25132d3c46848e7b7b57576113cd",
        dynamic_template_data: {
          token: token,
        },
      };

      sgMail.send(msg, (error, result) => {
        if (error) {
          console.log(error);
        } else {
          console.log("That's wassup!");
        }
      });
      return res.status(OK).send({ error: false });
    } else {
      return res.status(OK).send({ error: false });
    }
  },

  resetPassword: async (req, res) => {
    const token = req.body.token;
    const user = await User.findOne({ where: { forgotToken: token } });

    if (user) {
      const today = new Date();
      if (today <= user.expiryDate) {
        return res.status(OK).send({ error: false });
      }
    }
    return res.status(OK).send({ error: true });
  },

  resetPasswordPost: async (req, res) => {
    const { password, token } = req.body;

    const user = await User.findOne({
      where: { forgotToken: token },
    });
    if (user) {
      bcrypt.genSalt(4, async function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
          const newPassword = hash;
          // create that user as no one by that username exists
          if (err) {
            return res.status(OK).send({ error: true });
          } else {
            const userData = {
              password: newPassword,
              expiryDate: "",
              forgotToken: "",
            };
            await User.update(userData, {
              where: {
                id: user.id,
              },
            });
          }
        });
      });
      return res.status(OK).send({ error: false });
    } else {
      return res.status(OK).send({ error: true });
    }
  },

  findAllUserForDash: async (req, res) => {
    const data = await User.findAll({
      where: { canShow: true },
      order: [["createdAt", "desc"]],
      limit: 12,
      include: [{ all: true }],
      subQuery: false,
    });
    return res.status(OK).send({ error: false, data: data });
  },

  delete: async (req, res) => {
    const id = req.params.id;

    const data = await User.update(
      {
        canShow: false,
      },
      {
        where: {
          id: id,
        },
      }
    );
    return res.status(OK).send({ error: false, data: data });
  },

  runApplicationMigration: async (req, res) => {
    let result = await axios.get(
      "http://foodengo.foodengo.a2hosted.com/application/allApplications"
    );
    //result.data.app.forEach(async (user) => {
    // // const allApplications = await Application.findAll();
    // // console.log(allApplications);
    // for (const user of allApplications) {
    //   console.log("----------------------------------------" + user.regData);

    for (const user of result.data.app) {
      const country = await Country.findOne({
        where: { name: user.Country.name },
      });
      const findUser = await User.findOne({ where: { intId: user.userId } });

      if (!findUser) {
        continue;
      } else {
        console.log(
          "User Founddddddddddddddddddddd ------------------------------------------------------"
        );
      }

      const findRelationship = await Relationship.findOne({
        where: { name: user.sponsor },
      });
      // const userData = {
      //   firstname: user.firstname,
      //   middlename: user.middlename,
      //   lastname: user.lastname,
      //   marital: user.marital,
      //   gender: user.gender,
      //   dob: user.dob,
      //   homeAddress: user.homeAddress,
      //   postalAddress: user.postalAddress,
      //   contactEmail: user.contactEmail,
      //   countryId: country ? country.id : "",
      // };

      // if (user.phone) {
      //   userData.phone = user.phone;
      // }
      // await User.update(userData, {
      //   where: {
      //     id: findUser.id,
      //   },
      // });

      // const findQualification = await QualificationType.findOne({
      //   where: { name: user.hQualification },
      // });
      // if (user.hSchoolName) {
      //   await Qualification.create({
      //     id: uuidv4(),
      //     hq_grade: user.hGrade,
      //     hq_schoolName: user.hSchoolName,
      //     hq_completed: user.hCompleted,
      //     hq_programmeYear: user.hProgrammeYear,
      //     userId: findUser.id,
      //     qualificationTypeId: findQualification ? findQualification.id : null,
      //   });
      // }
      // if (user.pSchoolName) {
      //   const findQualification = await QualificationType.findOne({
      //     where: { name: user.pQualification },
      //   });

      //   await PreviousQualification.create({
      //     id: uuidv4(),
      //     pq_grade: user.pGrade,
      //     pq_schoolName: user.pSchoolName,
      //     pq_completed: user.pCompleted,
      //     pq_programmeYear: user.pProgrammeYear,
      //     userId: findUser.id,
      //     qualificationTypeId: findQualification ? findQualification.id : null,
      //   });
      // }
      // if (user.highSchoolName) {
      //   await HighSchool.create({
      //     id: uuidv4(),
      //     highSchoolName: user.highSchoolName,
      //     completionYear: user.completionYr,
      //     userId: findUser.id,
      //   });
      // }
      // if (user.sponsorName) {
      //   let datObj = {
      //     id: uuidv4(),
      //     sponsor: user.sponsorName,
      //     occupation: user.sponsorOccupation,
      //     userId: findUser.id,
      //     budget: user.budget,
      //   };
      //   if (findRelationship) {
      //     datObj.relationshipId = findRelationship.id;
      //   }
      //   await Sponsorship.create(datObj);
      // }
      // if (user.hasApplied) {
      //   await VisaHistory.create({
      //     id: uuidv4(),
      //     hasApplied: user.hasApplied,
      //     purpose: user.purpose,
      //     reason: user.reasonOfRefusal,
      //     moreInfo: user.moreInfo,
      //     userId: findUser.id,
      //   });
      // }
      // if (user.course1) {
      //   const findApplication = await Application.findOne({
      //     where: { userId: findUser.id },
      //   });
      //   if (findApplication) {
      //     let name = null;
      //     if (user.decision == "Pending") {
      //       name = "Pending";
      //     }
      //     if (user.decision == "Conditional Offer") {
      //       name = "Conditional Offer";
      //     }
      //     if (user.decision == "Unconditional Offer") {
      //       name = "Unconditional Offer";
      //     }
      //     if (user.decision == "Application Rejected") {
      //       name = "Rejected";
      //     }

      //     const findDecision = await Decision.findOne({
      //       where: { name: name },
      //     });
      //     let dataObj = {
      //       credential: user.credential,
      //     };
      //     if (findDecision) {
      //       dataObj.decision = findDecision.id;
      //     }
      //     await Application.update(dataObj, {
      //       where: { id: findApplication.id },
      //     });
      //   }
      // }
    }

    //return res.status(OK).send({ error: false, data: result.data.app });
  },

  runUserMigration: async (req, res) => {
    let result = await axios.post("https://scotstudy.co.uk/user/findAllUsers");
    for (const user of result.data.user) {
      const userData = await User.create({
        id: uuidv4(),
        intId: user.id,
        email: user.email,
        password: user.password,
        roleId: "1aad6011-8464-4c38-a84e-36442d64911c",
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        username: user.username,
        phone: user.phone,
        regDate: user.createdAt,
      });
    }

    return res.status(OK).send({ error: false, data: result.data.user });
  },
};
