"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class VisaHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      VisaHistory.belongsTo(models.User, {
        foreignKey: "userId",
        as: "User",
      });
    }
  }
  VisaHistory.init(
    {
      hasApplied: DataTypes.STRING,
      purpose: DataTypes.STRING,
      hasRefused: DataTypes.STRING,
      reason: DataTypes.STRING,
      moreInfo: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "VisaHistory",
    }
  );
  return VisaHistory;
};
