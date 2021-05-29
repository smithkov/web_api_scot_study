"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("Applications", "decisionId", {
        type: Sequelize.UUID,
        references: {
          model: "Decisions",
          key: "id",
          as: "decisionId",
        },
      }),
      // queryInterface.addColumn("Applications", "refNo", {
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
