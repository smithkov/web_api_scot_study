"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Payment.belongsTo(models.PaymentPurpose, {
        foreignKey: "paymentPurposeId",
        as: "PaymentPurpose",
      });

      Payment.belongsTo(models.User, {
        foreignKey: "userId",
        as: "User",
      });
    }
  }
  Payment.init(
    {
      refId: DataTypes.STRING,
      amount: DataTypes.STRING,
      status: DataTypes.STRING,
      stripeSessionId: DataTypes.STRING,
      other: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Payment",
    }
  );
  return Payment;
};
