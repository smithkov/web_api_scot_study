"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PhdApplication extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PhdApplication.belongsTo(models.PhdQualification, {
        foreignKey: "phdQualificationId",
        as: "Qualification",
      });
    }
  }
  PhdApplication.init(
    {
      firstname: DataTypes.STRING,
      middlename: DataTypes.STRING,
      lastname: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      topic: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "PhdApplication",
    }
  );
  return PhdApplication;
};
