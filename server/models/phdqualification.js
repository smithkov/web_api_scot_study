"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PhdQualification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PhdQualification.hasMany(models.PhdApplication);
    }
  }
  PhdQualification.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "PhdQualification",
    }
  );
  return PhdQualification;
};
