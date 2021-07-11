"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course.belongsTo(models.DegreeType);
      Course.belongsTo(models.Faculty);
      Course.belongsTo(models.Requirement);
      Course.belongsTo(models.CoursePhoto, {
        foreignKey: "coursePhotoId",
        as: "CoursePhoto",
      });
      Course.belongsTo(models.Institution);
    }
  }
  Course.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      duration: DataTypes.STRING,
      intake: DataTypes.STRING,
      isPopular: DataTypes.BOOLEAN,
      facultyId: DataTypes.UUID,
      degreeTypeId: DataTypes.UUID,
      institutionId: DataTypes.UUID,
      scholarshipAmount: DataTypes.REAL,
      time: DataTypes.STRING,
      thumbnail: DataTypes.STRING,
      fee: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Course",
    }
  );
  return Course;
};
