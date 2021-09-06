"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Payments", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      amount: {
        type: Sequelize.REAL,
      },
      refId: {
        type: Sequelize.STRING,
      },
      stripeSessionId: {
        type: Sequelize.STRING,
      },
      paymentPurposeId: {
        type: Sequelize.UUID,
        references: {
          model: "PaymentPurposes",
          key: "id",
          as: "paymentPurposeId",
        },
      },
      status: {
        type: Sequelize.STRING,
      },
      other: {
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
    await queryInterface.dropTable("Payments");
  },
};
