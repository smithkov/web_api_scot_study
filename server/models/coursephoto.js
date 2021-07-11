"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CoursePhoto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CoursePhoto.hasMany(models.Course);
      CoursePhoto.belongsTo(models.Faculty, {
        foreignKey: "facultyId",
        as: "Faculty",
      });
    }
  }
  CoursePhoto.init(
    {
      url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "CoursePhoto",
    }
  );
  return CoursePhoto;
};
