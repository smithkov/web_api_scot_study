"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Agent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Agent.belongsTo(models.Role, {
        foreignKey: "roleId",
        as: "role",
      });
      Agent.hasMany(models.User);
      Agent.hasMany(models.Commission);
      Agent.belongsTo(models.Country, {
        foreignKey: "countryId",
        as: "country",
      });
    }
  }
  Agent.init(
    {
      agencyName: DataTypes.STRING,
      phone: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Agent",
    }
  );
  return Agent;
};
