"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PaymentPurpose extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PaymentPurpose.hasMany(models.Payment);
    }
  }
  PaymentPurpose.init(
    {
      name: DataTypes.STRING,
      serial: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "PaymentPurpose",
    }
  );
  return PaymentPurpose;
};
