"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Institution extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Institution.belongsTo(models.City);
      Institution.hasMany(models.Course);
    }
  }
  Institution.init(
    {
      name: DataTypes.STRING,
      about: DataTypes.STRING,
      sellingPoint: DataTypes.STRING,
      logo: DataTypes.STRING,
      banner: DataTypes.STRING,
      cityId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Institution",
    }
  );
  return Institution;
};
