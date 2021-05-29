const FacultyPhoto = require("../models").FacultyPhoto;
const Faculty = require("../models").Faculty;

const { v4: uuidv4 } = require("uuid");

const { SERVER_ERROR, OK, VALIDATION_ERROR } = require("../utility/statusCode");

module.exports = {
  findByFaculty(req, res) {
    const facultyId = req.body.facultyId;
    return FacultyPhoto.findAll({ where: { facultyId } }).then((facultyPhoto) =>
      res.status(OK).send({ error: false, data: facultyPhoto })
    );
  },

  findAll(req, res) {
    return FacultyPhoto.findAll({
      include: [
        {
          model: Faculty,
          as: "Faculty",
        },
      ],
    }).then((facultyPhoto) =>
      res.status(OK).send({ error: false, data: facultyPhoto })
    );
  },
  addCreate: async (req, res) => {
    const arr = [
      {
        facultyId: "250d2d75-7e69-49fa-8234-1cd565f57376",
        path:
          "https://scotsudy.s3.eu-west-2.amazonaws.com/course_images/bm_4.jpg",
      },
      {
        facultyId: "250d2d75-7e69-49fa-8234-1cd565f57376",
        path:
          "https://scotsudy.s3.eu-west-2.amazonaws.com/course_images/bm1.jpg",
      },

      {
        facultyId: "250d2d75-7e69-49fa-8234-1cd565f57376",
        path:
          "https://scotsudy.s3.eu-west-2.amazonaws.com/course_images/bm2.jpg",
      },

      {
        facultyId: "250d2d75-7e69-49fa-8234-1cd565f57376",
        path:
          "https://scotsudy.s3.eu-west-2.amazonaws.com/course_images/bm3.jpg",
      },

      {
        facultyId: "250d2d75-7e69-49fa-8234-1cd565f57376",
        path:
          "https://scotsudy.s3.eu-west-2.amazonaws.com/course_images/bm5.jpg",
      },

      {
        facultyId: "250d2d75-7e69-49fa-8234-1cd565f57376",
        path:
          "https://scotsudy.s3.eu-west-2.amazonaws.com/course_images/bm6.jpg",
      },

      {
        facultyId: "250d2d75-7e69-49fa-8234-1cd565f57376",
        path:
          "https://scotsudy.s3.eu-west-2.amazonaws.com/course_images/bm7.jpg",
      },

      {
        facultyId: "8d246951-4b16-44f6-8cfa-8bd736742825",
        path:
          "https://scotsudy.s3.eu-west-2.amazonaws.com/course_images/compu1.jpg",
      },

      {
        facultyId: "8d246951-4b16-44f6-8cfa-8bd736742825",
        path:
          "https://scotsudy.s3.eu-west-2.amazonaws.com/course_images/compu2.jpg",
      },

      {
        facultyId: "8d246951-4b16-44f6-8cfa-8bd736742825",
        path:
          "https://scotsudy.s3.eu-west-2.amazonaws.com/course_images/compu3.jpg",
      },

      {
        facultyId: "8d246951-4b16-44f6-8cfa-8bd736742825",
        path:
          "https://scotsudy.s3.eu-west-2.amazonaws.com/course_images/compu4.jpg",
      },

      {
        facultyId: "8d246951-4b16-44f6-8cfa-8bd736742825",
        path:
          "https://scotsudy.s3.eu-west-2.amazonaws.com/course_images/compu5.jpg",
      },

      {
        facultyId: "8d246951-4b16-44f6-8cfa-8bd736742825",
        path:
          "https://scotsudy.s3.eu-west-2.amazonaws.com/course_images/compu6.jpg",
      },

      {
        facultyId: "8d246951-4b16-44f6-8cfa-8bd736742825",
        path:
          "https://scotsudy.s3.eu-west-2.amazonaws.com/course_images/compu7.jpeg",
      },

      {
        facultyId: "36f19d62-ca16-4392-afc3-f6253d2da620",
        path:
          "https://scotsudy.s3.eu-west-2.amazonaws.com/course_images/engr1.jpg",
      },

      {
        facultyId: "36f19d62-ca16-4392-afc3-f6253d2da620",
        path:
          "https://scotsudy.s3.eu-west-2.amazonaws.com/course_images/engr2.jpg",
      },

      {
        facultyId: "36f19d62-ca16-4392-afc3-f6253d2da620",
        path:
          "https://scotsudy.s3.eu-west-2.amazonaws.com/course_images/engr3.jpg",
      },

      {
        facultyId: "36f19d62-ca16-4392-afc3-f6253d2da620",
        path:
          "https://scotsudy.s3.eu-west-2.amazonaws.com/course_images/engr4.jpg",
      },

      {
        facultyId: "36f19d62-ca16-4392-afc3-f6253d2da620",
        path:
          "https://scotsudy.s3.eu-west-2.amazonaws.com/course_images/engr5.jpg",
      },

      {
        facultyId: "36f19d62-ca16-4392-afc3-f6253d2da620",
        path:
          "https://scotsudy.s3.eu-west-2.amazonaws.com/course_images/engr6.jpg",
      },

      {
        facultyId: "36f19d62-ca16-4392-afc3-f6253d2da620",
        path:
          "https://scotsudy.s3.eu-west-2.amazonaws.com/course_images/engr7.jpg",
      },

      {
        facultyId: "a2059529-8766-4dd4-9bbb-dfa8f2540cc5",
        path:
          "https://scotsudy.s3.eu-west-2.amazonaws.com/course_images/human1.jpg",
      },

      {
        facultyId: "a2059529-8766-4dd4-9bbb-dfa8f2540cc5",
        path:
          "https://scotsudy.s3.eu-west-2.amazonaws.com/course_images/human2.jpg",
      },

      {
        facultyId: "a2059529-8766-4dd4-9bbb-dfa8f2540cc5",
        path:
          "https://scotsudy.s3.eu-west-2.amazonaws.com/course_images/human3.jpg",
      },

      {
        facultyId: "a2059529-8766-4dd4-9bbb-dfa8f2540cc5",
        path:
          "https://scotsudy.s3.eu-west-2.amazonaws.com/course_images/human4.jpg",
      },

      {
        facultyId: "a2059529-8766-4dd4-9bbb-dfa8f2540cc5",
        path:
          "https://scotsudy.s3.eu-west-2.amazonaws.com/course_images/human5.jpg",
      },

      {
        facultyId: "a2059529-8766-4dd4-9bbb-dfa8f2540cc5",
        path:
          "https://scotsudy.s3.eu-west-2.amazonaws.com/course_images/human6.jpg",
      },

      {
        facultyId: "a2059529-8766-4dd4-9bbb-dfa8f2540cc5",
        path:
          "https://scotsudy.s3.eu-west-2.amazonaws.com/course_images/human7.jpeg",
      },

      {
        facultyId: "3ef55fdd-6c8e-419f-9196-6053794b4095",
        path:
          "https://scotsudy.s3.eu-west-2.amazonaws.com/course_images/life1.jpg",
      },

      {
        facultyId: "3ef55fdd-6c8e-419f-9196-6053794b4095",
        path:
          "https://scotsudy.s3.eu-west-2.amazonaws.com/course_images/life2.jpg",
      },

      {
        facultyId: "3ef55fdd-6c8e-419f-9196-6053794b4095",
        path:
          "https://scotsudy.s3.eu-west-2.amazonaws.com/course_images/life3.png",
      },

      {
        facultyId: "3ef55fdd-6c8e-419f-9196-6053794b4095",
        path:
          "https://scotsudy.s3.eu-west-2.amazonaws.com/course_images/life4.jpg",
      },

      {
        facultyId: "3ef55fdd-6c8e-419f-9196-6053794b4095",
        path:
          "https://scotsudy.s3.eu-west-2.amazonaws.com/course_images/life5.jpg",
      },

      {
        facultyId: "3ef55fdd-6c8e-419f-9196-6053794b4095",
        path:
          "https://scotsudy.s3.eu-west-2.amazonaws.com/course_images/life6.jpeg",
      },

      {
        facultyId: "3ef55fdd-6c8e-419f-9196-6053794b4095",
        path:
          "https://scotsudy.s3.eu-west-2.amazonaws.com/course_images/life6.jpg",
      },

      {
        facultyId: "3ef55fdd-6c8e-419f-9196-6053794b4095",
        path:
          "https://scotsudy.s3.eu-west-2.amazonaws.com/course_images/life7.png",
      },

      {
        facultyId: "48478e98-42a6-4f08-9e49-8317870bfb44",
        path:
          "https://scotsudy.s3.eu-west-2.amazonaws.com/course_images/media1.jpg",
      },

      {
        facultyId: "48478e98-42a6-4f08-9e49-8317870bfb44",
        path:
          "https://scotsudy.s3.eu-west-2.amazonaws.com/course_images/media2.jpg",
      },

      {
        facultyId: "48478e98-42a6-4f08-9e49-8317870bfb44",
        path:
          "https://scotsudy.s3.eu-west-2.amazonaws.com/course_images/media3.jpg",
      },

      {
        facultyId: "48478e98-42a6-4f08-9e49-8317870bfb44",
        path:
          "https://scotsudy.s3.eu-west-2.amazonaws.com/course_images/media4.jpg",
      },

      {
        facultyId: "48478e98-42a6-4f08-9e49-8317870bfb44",
        path:
          "https://scotsudy.s3.eu-west-2.amazonaws.com/course_images/media5.jpg",
      },

      {
        facultyId: "48478e98-42a6-4f08-9e49-8317870bfb44",
        path:
          "https://scotsudy.s3.eu-west-2.amazonaws.com/course_images/media7.jpg",
      },

      {
        facultyId: "4d9d1262-450a-4eb9-a6a4-cff838af42d1",
        path:
          "https://scotsudy.s3.eu-west-2.amazonaws.com/course_images/medicine1.jpg",
      },

      {
        facultyId: "4d9d1262-450a-4eb9-a6a4-cff838af42d1",
        path:
          "https://scotsudy.s3.eu-west-2.amazonaws.com/course_images/medicine2.jpg",
      },

      {
        facultyId: "4d9d1262-450a-4eb9-a6a4-cff838af42d1",
        path:
          "https://scotsudy.s3.eu-west-2.amazonaws.com/course_images/medicine3.jpg",
      },

      {
        facultyId: "4d9d1262-450a-4eb9-a6a4-cff838af42d1",
        path:
          "https://scotsudy.s3.eu-west-2.amazonaws.com/course_images/medicine4.jpg",
      },

      {
        facultyId: "4d9d1262-450a-4eb9-a6a4-cff838af42d1",
        path:
          "https://scotsudy.s3.eu-west-2.amazonaws.com/course_images/medicine5.jpg",
      },

      {
        facultyId: "4d9d1262-450a-4eb9-a6a4-cff838af42d1",
        path:
          "https://scotsudy.s3.eu-west-2.amazonaws.com/course_images/medicine6.jpg",
      },

      {
        facultyId: "4d9d1262-450a-4eb9-a6a4-cff838af42d1",
        path:
          "https://scotsudy.s3.eu-west-2.amazonaws.com/course_images/medicine7.png",
      },

      {
        facultyId: "7fb12650-7615-4614-bbf2-797d885c7c40",
        path:
          "https://scotsudy.s3.eu-west-2.amazonaws.com/course_images/nurse1.jpg",
      },

      {
        facultyId: "7fb12650-7615-4614-bbf2-797d885c7c40",
        path:
          "https://scotsudy.s3.eu-west-2.amazonaws.com/course_images/nurse2.png",
      },

      {
        facultyId: "7fb12650-7615-4614-bbf2-797d885c7c40",
        path:
          "https://scotsudy.s3.eu-west-2.amazonaws.com/course_images/nurse3.jpg",
      },

      {
        facultyId: "7fb12650-7615-4614-bbf2-797d885c7c40",
        path:
          "https://scotsudy.s3.eu-west-2.amazonaws.com/course_images/nurse4.jpg",
      },

      {
        facultyId: "7fb12650-7615-4614-bbf2-797d885c7c40",
        path:
          "https://scotsudy.s3.eu-west-2.amazonaws.com/course_images/nurse5.jpg",
      },

      {
        facultyId: "7fb12650-7615-4614-bbf2-797d885c7c40",
        path:
          "https://scotsudy.s3.eu-west-2.amazonaws.com/course_images/nurse6.jpeg",
      },

      {
        facultyId: "7fb12650-7615-4614-bbf2-797d885c7c40",
        path:
          "https://scotsudy.s3.eu-west-2.amazonaws.com/course_images/nurse7.jpg",
      },
    ];

    // arr.forEach(async (img) => {
    //   const { path, facultyId } = img;
    //   let me = await FacultyPhoto.create({
    //     id: uuidv4(),
    //     facultyId: facultyId,
    //     path: path,
    //   });
    // });
  },
};
