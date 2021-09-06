"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class VisaApplyStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      VisaApplyStatus.hasMany(models.Application);
    }
  }
  VisaApplyStatus.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "VisaApplyStatus",
    }
  );
  return VisaApplyStatus;
};
