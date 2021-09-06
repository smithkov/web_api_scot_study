"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Institutions", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      name: {
        type: Sequelize.STRING,
      },
      about: {
        type: Sequelize.STRING,
      },
      sellingPoint: {
        type: Sequelize.STRING,
      },
      logo: {
        type: Sequelize.STRING,
      },
      banner: {
        type: Sequelize.STRING,
      },

      cityId: {
        type: Sequelize.UUID,
        references: {
          model: "Cities",
          key: "id",
          as: "cityId",
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
    await queryInterface.dropTable("Institutions");
  },
};
