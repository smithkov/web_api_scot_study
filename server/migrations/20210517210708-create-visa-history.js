"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("VisaHistories", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      hasApplied: {
        type: Sequelize.STRING,
      },
      purpose: {
        type: Sequelize.STRING,
      },
      hasRefused: {
        type: Sequelize.STRING,
      },
      reason: {
        type: Sequelize.STRING,
      },
      moreInfo: {
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.UUID,
        references: {
          model: "Users",
          key: "id",
          as: "userId",
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
    await queryInterface.dropTable("VisaHistories");
  },
};
