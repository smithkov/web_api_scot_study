"use strict";

const { sequelize } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Applications", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      // name: {
      //   type: Sequelize.STRING,
      // },
      // dob: {
      //   type: Sequelize.STRING,
      // },
      // contactEmail: {
      //   type: Sequelize.STRING,
      // },

      // marital: {
      //   type: Sequelize.STRING,
      // },
      // homeAddress: {
      //   type: Sequelize.STRING,
      // },
      // postalAddress: {
      //   type: Sequelize.STRING,
      // },
      // contactEmail: {
      //   type: Sequelize.STRING,
      // },
      // phone: {
      //   type: Sequelize.STRING,
      // },

      // gender: {
      //   type: Sequelize.STRING,
      // },
      // HQ_grade: {
      //   type: Sequelize.STRING,
      // },
      // HQ_schoolName: {
      //   type: Sequelize.STRING,
      // },
      // HQ_completed: {
      //   type: Sequelize.STRING,
      // },
      // HQ_programmeYear: {
      //   type: Sequelize.STRING,
      // },
      // HQ_qualification: {
      //   type: Sequelize.STRING,
      // },
      // PQ_Grade: {
      //   type: Sequelize.STRING,
      // },
      // PQ_schoolName: {
      //   type: Sequelize.STRING,
      // },
      // PQ_completed: {
      //   type: Sequelize.STRING,
      // },
      // PQ_programmeYear: {
      //   type: Sequelize.STRING,
      // },
      // PQ_qualification: {
      //   type: Sequelize.STRING,
      // },
      // highSchoolName: {
      //   type: Sequelize.STRING,
      // },
      // completionYear: {
      //   type: Sequelize.STRING,
      // },
      // englishTest: {
      //   type: Sequelize.STRING,
      // },
      // sponsor: {
      //   type: Sequelize.STRING,
      // },

      // sponsorName: {
      //   type: Sequelize.STRING,
      // },
      // sponsorOccupation: {
      //   type: Sequelize.STRING,
      // },
      // budget: {
      //   type: Sequelize.STRING,
      // },

      // moreInfo: {
      //   type: Sequelize.STRING,
      // },

      stage: { allowNull: false, type: Sequelize.STRING },
      degreeTypeOne: { allowNull: false, type: Sequelize.STRING },
      degreeTypeTwo: { allowNull: false, type: Sequelize.STRING },
      courseOne: { allowNull: false, type: Sequelize.STRING },
      courseTwo: { allowNull: false, type: Sequelize.STRING },
      institutionOne: { allowNull: false, type: Sequelize.STRING },
      institutionTwo: { allowNull: false, type: Sequelize.STRING },
      eligibilityCheck: { type: Sequelize.BOOLEAN, defaultValue: false },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      hasSubmitted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      hasApplied: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      hasPaid: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      hasDecided: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      hasCAS: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      hasDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      decision: {
        type: Sequelize.STRING,
      },
      refNo: {
        type: Sequelize.STRING,
      },
      regDate: {
        type: Sequelize.STRING,
      },
      credential: {
        type: Sequelize.STRING,
      },
      canShow: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      cityId: {
        type: Sequelize.UUID,
        references: {
          model: "Cities",
          key: "id",
          as: "cityId",
        },
      },
      decisionId: {
        type: Sequelize.UUID,
        references: {
          model: "Decisions",
          key: "id",
          as: "decisionId",
        },
      },
      visaApplyStatusId: {
        type: Sequelize.INTEGER,
        references: {
          model: "VisaApplyStatuses",
          key: "id",
          as: "visaApplyStatusId",
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
      userId: {
        type: Sequelize.UUID,
        references: {
          model: "Users",
          key: "id",
          as: "userId",
        },
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Applications");
  },
};
