"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DegreeType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DegreeType.hasMany(models.Course);
      DegreeType.hasMany(models.Application);
    }
  }
  DegreeType.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      requirements: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "DegreeType",
    }
  );
  return DegreeType;
};
