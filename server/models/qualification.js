"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Qualification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Qualification.belongsTo(models.User, {
        foreignKey: "userId",
        as: "User",
      });

      Qualification.belongsTo(models.QualificationType, {
        foreignKey: "qualificationTypeId",
        as: "QualificationType",
      });
    }
  }
  Qualification.init(
    {
      hq_grade: DataTypes.STRING,
      hq_schoolName: DataTypes.STRING,
      hq_completed: DataTypes.STRING,
      hq_programmeYear: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Qualification",
    }
  );
  return Qualification;
};
