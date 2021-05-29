"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BankDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BankDetail.belongsTo(models.User);
    }
  }
  BankDetail.init(
    {
      name: DataTypes.STRING,
      accountNo: DataTypes.STRING,
      sortCode: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "BankDetail",
    }
  );
  return BankDetail;
};
