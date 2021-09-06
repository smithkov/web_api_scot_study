"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Sponsorship extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Sponsorship.belongsTo(models.User, {
        foreignKey: "userId",
        as: "User",
      });

      Sponsorship.belongsTo(models.User, {
        foreignKey: "relationshipId",
        as: "Relationship",
      });
    }
  }
  Sponsorship.init(
    {
      sponsor: DataTypes.STRING,
      name: DataTypes.STRING,
      occupation: DataTypes.STRING,

      budget: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Sponsorship",
    }
  );
  return Sponsorship;
};
