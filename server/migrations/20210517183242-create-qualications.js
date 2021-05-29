"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Qualifications", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },

      hq_grade: { type: Sequelize.STRING },
      hq_schoolName: { type: Sequelize.STRING },
      hq_completed: { type: Sequelize.STRING },
      hq_programmeYear: { type: Sequelize.STRING },

      userId: {
        type: Sequelize.UUID,
        references: {
          model: "Users",
          key: "id",
          as: "userId",
        },
      },
      qualificationTypeId: {
        type: Sequelize.UUID,
        references: {
          model: "QualificationTypes",
          key: "id",
          as: "qualificationTypeId",
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
    await queryInterface.dropTable("Qualifications");
  },
};
