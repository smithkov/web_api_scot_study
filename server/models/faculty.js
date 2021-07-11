"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Faculty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Faculty.hasMany(models.Course);

      // Faculty.hasMany(models.FacultyPhoto);
      Faculty.hasMany(models.CoursePhoto);
    }
  }
  Faculty.init(
    {
      name: DataTypes.STRING,
      icon: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Faculty",
    }
  );
  return Faculty;
};
