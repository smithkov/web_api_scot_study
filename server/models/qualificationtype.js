"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class QualificationType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // QualificationType.hasMany(models.Qualification);
      // QualificationType.hasMany(models.PreviousQualification);
    }
  }
  QualificationType.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "QualificationType",
    }
  );
  return QualificationType;
};
