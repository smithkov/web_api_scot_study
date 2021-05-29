"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PreviousQualification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PreviousQualification.belongsTo(models.User, {
        foreignKey: "userId",
        as: "User",
      });
      PreviousQualification.belongsTo(models.QualificationType, {
        foreignKey: "qualificationTypeId",
        as: "QualificationType",
      });
    }
  }
  PreviousQualification.init(
    {
      pq_grade: DataTypes.STRING,
      pq_schoolName: DataTypes.STRING,
      pq_completed: DataTypes.STRING,
      pq_programmeYear: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "PreviousQualification",
    }
  );
  return PreviousQualification;
};
