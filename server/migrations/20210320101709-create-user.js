"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      username: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      roleId: {
        type: Sequelize.UUID,
        references: {
          model: "Roles",
          key: "id",
          as: "roleId",
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
      firstname: {
        type: Sequelize.STRING,
      },
      middlename: {
        type: Sequelize.STRING,
      },
      lastname: {
        type: Sequelize.STRING,
      },
      dob: {
        type: Sequelize.STRING,
      },
      gender: {
        type: Sequelize.STRING,
      },
      marital: {
        type: Sequelize.STRING,
      },
      homeAddress: {
        type: Sequelize.STRING,
      },
      postalAddress: {
        type: Sequelize.STRING,
      },
      contactEmail: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },

      countryId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Countries",
          key: "id",
          as: "countryId",
        },
      },

      agentId: {
        type: Sequelize.UUID,
        references: {
          model: "Agents",
          key: "id",
          as: "agentId",
        },
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Users");
  },
};
