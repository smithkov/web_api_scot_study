const Course = require("../models").Course;
const City = require("../models").City;
const Institution = require("../models").Institution;
const Faculty = require("../models").Faculty;
const CoursePhoto = require("../models").CoursePhoto;
const FacultyPhoto = require("../models").FacultyPhoto;
const DegreeType = require("../models").DegreeType;
const model = require("../models");
const Op = require("sequelize").Op;
const Sequelize = require("sequelize");
const Query = new require("../utility/crud");
const axios = require("axios");

const { SERVER_ERROR, OK, VALIDATION_ERROR } = require("../utility/statusCode");
const query = new Query(Course);
const queryInstitution = new Query(Institution);

module.exports = {
  create: async (req, res) => {
    const {
      name,
      duration,
      isPopular,
      scholarshipAmount,
      intake,
      thumbnail,
      fee,
      facultyId,
      institutionId,
      degreeTypeId,
    } = req.body;
    const data = await query.add({
      name,
      duration,
      isPopular,
      scholarshipAmount,
      intake,
      thumbnail,
      fee,
      facultyId,
      institutionId,
      degreeTypeId,
    });
    return res.status(OK).send({ data: data, error: false });
  },

  update: async (req, res) => {
    const id = req.params.id;
    const {
      name,
      duration,
      isPopular,
      scholarshipAmount,
      intake,
      fee,
      facultyId,
      institutionId,
      degreeTypeId,
    } = req.body;

    const data = await query.update(id, {
      name,
      duration,
      isPopular,
      scholarshipAmount,
      intake,
      fee,
      facultyId,
      institutionId,
      degreeTypeId,
    });

    return res.status(OK).send({ error: false, data: data });
  },
  delete(req, res) {
    const id = req.params.id;
    return query
      .delete(id)
      .then((course) => res.status(OK).send({ error: false, data: id }))
      .catch((error) => res.status(OK).send({ error: true, data: id }));
  },

  findPk: async (req, res) => {
    const id = req.params.id;

    const course = await Course.findByPk(id, {
      include: [
        {
          model: Institution,
          as: "Institution",
        },
        {
          model: Institution,
          as: "Institution",
        },
        {
          model: Faculty,
          as: "Faculty",
        },
        {
          model: CoursePhoto,
          as: "CoursePhoto",
        },
        {
          model: DegreeType,
          as: "DegreeType",
        },
      ],
    });
    return res.status(OK).send({ error: false, data: course });
  },
  courseSearch: async (req, res) => {
    const search = req.body.search.toLowerCase();

    const data = await Course.findAll({
      where: model.sequelize.where(
        model.sequelize.fn("lower", model.sequelize.col("course.name")),
        {
          [Op.like]: `%${search}%`,
        }
      ),
      limit: 10,
      include: [
        {
          model: Institution,
          as: "Institution",
        },
        {
          model: Institution,
          as: "Institution",
        },
        {
          model: CoursePhoto,
          as: "CoursePhoto",
        },
        {
          model: Faculty,
          as: "Faculty",
        },
      ],
      subQuery: false,
    });
    res.status(OK).send({
      error: false,
      desc: "Matching result(s) based on your search",
      data: data,
    });
  },

  courseByParams: async (req, res) => {
    const { institutionId, offset, facultyId, degreeTypeId, limit, search } =
      req.body;

    const dataObject = {};
    if (facultyId != "") {
      dataObject.facultyId = facultyId;
    }
    if (degreeTypeId != "") {
      dataObject.degreeTypeId = degreeTypeId;
    }
    if (search != "") {
      dataObject.name = { [Op.like]: `%${search}%` };
    }
    if (institutionId != "") {
      dataObject.institutionId = institutionId;
    }

    const data = await Course.findAll({
      where: dataObject,
      limit,
      offset,
      include: [
        {
          model: Institution,
          as: "Institution",
          include: [
            {
              model: City,
              as: "City",
            },
          ],
        },
        {
          model: CoursePhoto,
          as: "CoursePhoto",
        },
        {
          model: Faculty,
          as: "Faculty",
          required: false,
        },
      ],
      subQuery: false,
    });
    res.status(OK).send({
      error: false,
      desc: "Matching result(s) based on your search",
      data: data,
    });
  },

  findCourseByInstitution: async (req, res) => {
    const { institutionId, offset, facultyId, degreeTypeId, limit, search } =
      req.body;

    const dataObject = { institutionId: institutionId };
    if (facultyId != "") {
      dataObject.facultyId = facultyId;
    }
    if (degreeTypeId != "") {
      dataObject.degreeTypeId = degreeTypeId;
    }

    if (search != "") {
      dataObject.name = { [Op.like]: `%${search}%` };
    }

    const data = await Course.findAll({
      where: dataObject,
      limit,
      offset,
      include: [
        {
          model: Institution,
          as: "Institution",
          include: [
            {
              model: City,
              as: "City",
            },
          ],
        },
        {
          model: CoursePhoto,
          as: "CoursePhoto",
        },
        {
          model: Faculty,
          as: "Faculty",
          required: false,
        },
        {
          model: DegreeType,
          as: "DegreeType",
          required: false,
        },
      ],
      subQuery: false,
    });
    res.status(OK).send({
      error: false,
      desc: "Matching result(s) based on your search",
      data: data,
    });
  },

  allCoursesSearch: async (req, res) => {
    const { institutionId, offset, facultyId, degreeTypeId, limit, search } =
      req.body;

    const dataObject = {};
    console.log(req.body);
    if (facultyId != "") {
      dataObject.facultyId = facultyId;
    }
    if (degreeTypeId != "") {
      dataObject.degreeTypeId = degreeTypeId;
    }
    if (search != "") {
      dataObject.name = { [Op.like]: `%${search}%` };
    }
    if (institutionId != "") {
      dataObject.institutionId = institutionId;
    }

    const hasData = Object.keys(dataObject).length;
    let data;
    if (hasData) {
      data = await Course.findAll({
        where: dataObject,
        limit,
        offset,
        include: [
          {
            model: Institution,
            as: "Institution",
            required: false,
            include: [
              {
                model: City,
                as: "City",
                required: false,
              },
            ],
          },
          {
            model: CoursePhoto,
            as: "CoursePhoto",
            required: false,
          },
          {
            model: Faculty,
            as: "Faculty",
            required: false,
          },
          {
            model: DegreeType,
            as: "DegreeType",
            required: false,
          },
        ],
        subQuery: false,
      });
    } else {
      data = await Course.findAll({
        include: [
          {
            model: Institution,
            as: "Institution",
            include: [
              {
                model: City,
                as: "City",
                required: false,
              },
            ],
            required: false,
          },
          {
            model: CoursePhoto,
            as: "CoursePhoto",
            required: false,
          },
          {
            model: Faculty,
            as: "Faculty",
            required: false,
          },
          {
            model: DegreeType,
            as: "DegreeType",
            required: false,
          },
        ],

        subQuery: false,
        limit,
        offset,
      });
    }

    res.status(OK).send({
      error: false,
      desc: "Matching result(s) based on your search",
      data: data,
    });
  },

  compare: async (req, res) => {
    const {
      institutionId,
      offset,
      facultyId,
      degreeTypeId,
      limit,
      search,
      scholarshipAmount,
    } = req.body;

    const dataObject = {};
    if (facultyId != "") {
      dataObject.facultyId = facultyId;
    }
    if (degreeTypeId != "") {
      dataObject.degreeTypeId = degreeTypeId;
    }
    if (search != "") {
      dataObject.name = { [Op.like]: `%${search}%` };
    }
    if (institutionId != "") {
      dataObject.institutionId = institutionId;
    }
    if (scholarshipAmount) {
      dataObject.scholarshipAmount = {
        [Op.not]: "0",
      };
    }

    const hasData = Object.keys(dataObject).length;
    let data;
    if (hasData) {
      data = await Course.findAll({
        where: dataObject,
        limit,
        offset,
        include: [
          {
            model: Institution,
            as: "Institution",
            required: false,
            include: [
              {
                model: City,
                as: "City",
                required: false,
              },
            ],
          },
          {
            model: CoursePhoto,
            as: "CoursePhoto",
            required: false,
          },
          {
            model: Faculty,
            as: "Faculty",
            required: false,
          },
          {
            model: DegreeType,
            as: "DegreeType",
            required: false,
          },
        ],
        subQuery: false,
      });
    } else {
      data = await Course.findAll({
        include: [
          {
            model: Institution,
            as: "Institution",
            include: [
              {
                model: City,
                as: "City",
                required: false,
              },
            ],
            required: false,
          },
          {
            model: CoursePhoto,
            as: "CoursePhoto",
            required: false,
          },
          {
            model: Faculty,
            as: "Faculty",
            required: false,
          },
          {
            model: DegreeType,
            as: "DegreeType",
            required: false,
          },
        ],

        subQuery: false,
        limit,
        offset,
      });
    }

    res.status(OK).send({
      error: false,
      desc: "Matching result(s) based on your search",
      data: data,
    });
  },

  compareForMobile: async (req, res) => {
    const {
      offset,
      facultyId,
      degreeTypeId,
      limit,
      search,
      institutionId1,
      institutionId2,
    } = req.body;
    console.log(req.body);
    const dataObject = {};
    if (facultyId != "") {
      dataObject.facultyId = facultyId;
    }
    if (degreeTypeId != "") {
      dataObject.degreeTypeId = degreeTypeId;
    }
    if (search != "") {
      dataObject.name = { [Op.like]: `%${search}%` };
    }
    console.log(institutionId1 + " " + institutionId2);
    if (institutionId1 && institutionId2) {
      dataObject.institutionId = [institutionId1, institutionId2];
    }

    const hasData = Object.keys(dataObject).length;
    let data;
    if (hasData) {
      data = await Course.findAll({
        where: dataObject,
        limit,
        offset,
        include: [
          {
            model: Institution,
            as: "Institution",
            required: false,
            include: [
              {
                model: City,
                as: "City",
                required: false,
              },
            ],
          },
          {
            model: CoursePhoto,
            as: "CoursePhoto",
            required: false,
          },
          {
            model: Faculty,
            as: "Faculty",
            required: false,
          },
          {
            model: DegreeType,
            as: "DegreeType",
            required: false,
          },
        ],
        subQuery: false,
      });
    } else {
      data = await Course.findAll({
        include: [
          {
            model: Institution,
            as: "Institution",
            include: [
              {
                model: City,
                as: "City",
                required: false,
              },
            ],
            required: false,
          },
          {
            model: CoursePhoto,
            as: "CoursePhoto",
            required: false,
          },
          {
            model: Faculty,
            as: "Faculty",
            required: false,
          },
          {
            model: DegreeType,
            as: "DegreeType",
            required: false,
          },
        ],

        subQuery: false,
        limit,
        offset,
      });
    }

    res.status(OK).send({
      error: false,
      desc: "Matching result(s) based on your search",
      data: data,
    });
  },
  findCoursesByFaculty: async (req, res) => {
    const facultyId = req.body.facultyId;

    const data = await Course.findAll({
      where: { facultyId },
      limit: 5,
      order: Sequelize.literal("rand()"),
      include: [
        {
          model: Institution,
          as: "Institution",
          include: [
            {
              model: City,
              as: "City",
            },
          ],
        },
        {
          model: CoursePhoto,
          as: "CoursePhoto",
        },
        {
          model: Faculty,
          as: "Faculty",
          required: false,
        },
      ],
      subQuery: false,
    });
    res.status(OK).send({
      error: false,
      desc: "Matching result(s) based on your search",
      data: data,
    });
  },

  relatedCourses: async (req, res) => {
    const facultyId = req.body.facultyId;
    const rand = Math.floor(Math.random() * 10) + 1;
    const data = await Course.findAll({
      where: { facultyId },
      include: [
        {
          model: CoursePhoto,
          as: "CoursePhoto",
        },
      ],
      subQuery: false,
      limit: 4,
      offset: rand,
    });
    res.status(OK).send({
      error: false,
      data: data,
    });
  },
  findCourseByInstitutionForReg: async (req, res) => {
    const { institutionId, degreeTypeId, search, facultyId } = req.body;

    const dataObject = {};

    if (degreeTypeId != "") {
      dataObject.degreeTypeId = degreeTypeId;
    }
    if (search != "") {
      dataObject.name = { [Op.like]: `%${search}%` };
    }
    if (institutionId != "") {
      dataObject.institutionId = institutionId;
    }

    if (facultyId != "") {
      dataObject.facultyId = facultyId;
    }

    //const hasData = Object.keys(dataObject).length;

    const data = await Course.findAll({
      where: dataObject,
      limit: 10,
      include: [
        {
          model: Faculty,
          as: "Faculty",
          required: false,
        },
        {
          model: DegreeType,
          as: "DegreeType",
          required: false,
        },
        {
          model: Institution,
          as: "Institution",
          required: false,
        },
      ],
      subQuery: false,
    });

    res.status(OK).send({
      error: false,
      desc: "Matching result(s) based on your search",
      data: data,
    });
  },
  popularCourses: async (req, res) => {
    const data = await Course.findAll({
      where: { isPopular: true },
      limit: 4,
      order: Sequelize.literal("rand()"),
      include: [
        {
          model: CoursePhoto,
          as: "CoursePhoto",
        },
      ],
      subQuery: false,
    });
    res.status(OK).send({
      error: false,
      desc: "Matching result(s) based on your search",
      data: data,
    });
  },

  findAll: async (req, res) => {
    const course = Course.findAll({
      include: [
        {
          model: Institution,
          as: "Institution",
        },
        {
          model: CoursePhoto,
          as: "CoursePhoto",
        },
        {
          model: Institution,
          as: "Institution",
        },
        {
          model: Faculty,
          as: "Faculty",
        },
      ],
    });
    return res.status(OK).send({ error: false, data: course });
  },
  runScriptForSchool: async (req, res) => {
    // let result = await axios.post(
    //   "https://www.scotstudy.co.uk/institution/getAllSchools"
    // );
    // let data = result.data.data;
    // let city;
    // data.forEach(async (item) => {
    //   const { name, about, path, banner, cityId, sellingPoint } = item;
    //   if (cityId == 1) {
    //     city = "93d01bf0-8650-43d1-b66e-fcbb87496e8d";
    //   } else if (cityId == 2) {
    //     city = "7d068e66-638c-4d3e-8ace-1e72def4ec8a";
    //   } else if (cityId == 3) {
    //     city = "4375e178-416c-46c7-b654-85039636b617";
    //   } else if (cityId == 4) {
    //     city = "8d0d77c4-19a0-4940-8fe0-a5b83705d69d";
    //   } else if (cityId == 5) {
    //     city = "ca295e05-b877-4405-ad67-0270a3299b30";
    //   } else if (cityId == 6) {
    //     city = "4228e8f1-17a9-4b8e-a932-5587762f263b";
    //   } else if (cityId == 7) {
    //     city = "f19340ed-6e5c-4ea8-8401-d3938e2d2327";
    //   } else if (cityId == 8) {
    //     city = "ad8d8c7b-6b6b-4c28-a9cf-418c29995b00";
    //   }
    //   const create = await queryInstitution.add({
    //     name,
    //     about,
    //     sellingPoint,
    //     logo: path,
    //     banner,
    //     cityId: city,
    //   });
    // });
  },
  runScript: async (req, res) => {
    let result = await axios.post(
      "https://www.scotstudy.co.uk/course/getAllcourses"
    );
    let data = result.data.data;

    let studyArea;
    let degreeType;
    let institution;

    //data.forEach(async (item) => {
    for (const item of data) {
      const {
        name,
        studyAreaId,
        degreeTypeId,
        fee,
        duration,
        isPopular,
        scholarshipAmount,
        institutionId,
        intake,
        time,
      } = item;
      if (institutionId == 2) {
        institution = "8f69de01-c30c-4160-a804-51e92ea7936e";
      } else if (institutionId == 3) {
        institution = "5dcbbb7c-c1a4-4404-9887-6c18acb87ff5";
      } else if (institutionId == 4) {
        institution = "1d03e8c8-54ad-4494-b74b-2372008d334a";
      } else if (institutionId == 5) {
        institution = "557fc39b-5901-4463-972f-3e6e3c111f36";
      } else if (institutionId == 6) {
        institution = "0171d165-959b-4647-8267-f426b6de165a";
      } else if (institutionId == 7) {
        institution = "cd0b47a2-7c1a-40e9-88ed-ec7c72934035";
      } else if (institutionId == 8) {
        institution = "445d5b0b-6b9d-4e1d-af32-a8ad4d91cc65";
      } else if (institutionId == 9) {
        institution = "14022ef1-56d0-4742-a3d3-35e9cf7b6b04";
      } else if (institutionId == 10) {
        institution = "4b645b5f-aed7-4752-8f96-cf14914ce517";
      } else if (institutionId == 11) {
        institution = "e0efde4d-9619-44ac-be64-889a24d3ac0e";
      } else if (institutionId == 12) {
        institution = "c7f67d8b-b2f8-4f11-9fd9-fa870104c261";
      } else if (institutionId == 13) {
        institution = "ce2c8633-147e-408d-9a72-dc7090f021a9";
      } else if (institutionId == 14) {
        institution = "a32b7926-8775-440d-973a-b79d6f7cf0d5";
      } else if (institutionId == 15) {
        institution = "f932b8c6-8daa-4770-887f-4368bfdbdc54";
      } else if (institutionId == 16) {
        institution = "f50c7df5-48ee-4e4e-81aa-8d3ecd6b09a0";
      } else if (institutionId == 17) {
        institution = "5a2355d3-c4a3-4ec2-aece-b5a0725964a9";
      }
      if (studyAreaId == 1) {
        studyArea = "250d2d75-7e69-49fa-8234-1cd565f57376";
      } else if (studyAreaId == 2) {
        studyArea = "36f19d62-ca16-4392-afc3-f6253d2da620";
      } else if (studyAreaId == 5) {
        studyArea = "3ef55fdd-6c8e-419f-9196-6053794b4095";
      } else if (studyAreaId == 6) {
        studyArea = "48478e98-42a6-4f08-9e49-8317870bfb44";
      } else if (studyAreaId == 7) {
        studyArea = "4d9d1262-450a-4eb9-a6a4-cff838af42d1";
      } else if (studyAreaId == 8) {
        studyArea = "7fb12650-7615-4614-bbf2-797d885c7c40";
      } else if (studyAreaId == 9) {
        studyArea = "8d246951-4b16-44f6-8cfa-8bd736742825";
      } else if (studyAreaId == 10) {
        studyArea = "a2059529-8766-4dd4-9bbb-dfa8f2540cc5";
      }
      if (degreeTypeId == 1) {
        degreeType = "1aad6011-8464-4c38-a84e-36442d64911c";
      } else if (degreeTypeId == 3) {
        degreeType = "ead37f16-9474-4c55-ab96-c798341d60f4";
      }
      const create = await query.add({
        name,
        duration,
        intake,
        isPopular,
        scholarshipAmount: scholarshipAmount,
        time,
        institutionId: institution,
        fee,
        degreeTypeId: degreeType,
        facultyId: studyArea,
      });
    }
    res.status(OK).send({ error: false, data: {} });
  },
};
