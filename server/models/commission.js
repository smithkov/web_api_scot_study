"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Commission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Commission.belongsTo(models.Agent);
    }
  }
  Commission.init(
    {
      amount: DataTypes.REAL,
      hasPaid: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Commission",
    }
  );
  return Commission;
};
