"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Courses", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      name: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      duration: {
        type: Sequelize.STRING,
      },
      intake: {
        type: Sequelize.STRING,
      },
      isPopular: {
        type: Sequelize.BOOLEAN,
      },
      scholarshipAmount: {
        type: Sequelize.STRING,
      },
      time: {
        type: Sequelize.STRING,
      },
      thumbnail: {
        type: Sequelize.STRING,
      },
      fee: {
        type: Sequelize.STRING,
      },
      facultyId: {
        type: Sequelize.UUID,
        references: {
          model: "Faculties",
          key: "id",
          as: "facultyId",
        },
      },
      coursePhotoId: {
        type: Sequelize.UUID,
        references: {
          model: "CoursePhotos",
          key: "id",
          as: "coursePhotoId",
        },
      },
      institutionId: {
        type: Sequelize.UUID,
        references: {
          model: "Institutions",
          key: "id",
          as: "institutionId",
        },
      },
      degreeTypeId: {
        type: Sequelize.UUID,
        references: {
          model: "DegreeTypes",
          key: "id",
          as: "degreeTypeId",
        },
      },
      requirementId: {
        type: Sequelize.UUID,
        references: {
          model: "Requirements",
          key: "id",
          as: "requirementId",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Courses");
  },
};
