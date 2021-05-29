"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class HighSchoolQualification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      HighSchoolQualification.belongsTo(models.User, {
        foreignKey: "userId",
        as: "User",
      });
    }
  }
  HighSchoolQualification.init(
    {
      highSchoolName: DataTypes.STRING,
      completionYear: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "HighSchoolQualification",
    }
  );
  return HighSchoolQualification;
};
