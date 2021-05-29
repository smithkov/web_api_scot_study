"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EnglishTest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      EnglishTest.belongsTo(models.User, {
        foreignKey: "userId",
        as: "User",
      });
    }
  }
  EnglishTest.init(
    {
      name: DataTypes.STRING,
      score: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "EnglishTest",
    }
  );
  return EnglishTest;
};
