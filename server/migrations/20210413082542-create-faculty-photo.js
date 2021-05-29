"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("FacultyPhotos", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      path: {
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
    await queryInterface.dropTable("FacultyPhotos");
  },
};
