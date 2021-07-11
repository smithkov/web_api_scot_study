"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("CoursePhotos", "facultyId", {
        type: Sequelize.UUID,
        references: {
          model: "Faculties",
          key: "id",
          as: "facultyId",
        },
      }),

      // queryInterface.addColumn("Agents", "countryId", {
      //   type: Sequelize.INTEGER,
      //   references: {
      //     model: "Countries",
      //     key: "id",
      //     as: "country",
      //   },
      // }),
      // queryInterface.addColumn("Agents", "email", {
      //   type: Sequelize.STRING,
      //   allowNull: true,
      // }),
      // queryInterface.addColumn("Agents", "password", {
      //   type: Sequelize.STRING,
      //   allowNull: true,
      // }),

      // queryInterface.addColumn("Users", "bio", {
      //   type: Sequelize.TEXT,
      //   allowNull: true,
      // }),
    ]);
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  },
};
