"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Role, {
        foreignKey: "roleId",
        as: "Role",
      });
      User.belongsTo(models.Country, {
        foreignKey: "countryId",
        as: "country",
      });

      User.belongsTo(models.Agent, {
        foreignKey: "agentId",
        as: "Agent",
      });

      User.hasMany(models.Credential);
      User.hasMany(models.Payment);
      User.hasMany(models.BankDetail);
      User.hasMany(models.Qualification);
      User.hasMany(models.Application);
      User.hasMany(models.Document);
    }
  }
  User.init(
    {
      intId: DataTypes.INTEGER,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      firstname: DataTypes.STRING,
      middlename: DataTypes.STRING,
      lastname: DataTypes.STRING,
      dob: DataTypes.STRING,
      gender: DataTypes.STRING,
      marital: DataTypes.STRING,
      homeAddress: DataTypes.STRING,
      postalAddress: DataTypes.STRING,
      contactEmail: DataTypes.STRING,
      phone: DataTypes.STRING,
      updatedAt: DataTypes.DATE,
      createdAt: DataTypes.DATE,
      expiryDate: DataTypes.DATE,
      forgotToken: DataTypes.STRING,
      regDate: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
