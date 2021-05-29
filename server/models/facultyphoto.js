"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class FacultyPhoto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      FacultyPhoto.belongsTo(models.Faculty);
    }
  }
  FacultyPhoto.init(
    {
      path: DataTypes.STRING,
      facultyId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "FacultyPhoto",
    }
  );
  return FacultyPhoto;
};
