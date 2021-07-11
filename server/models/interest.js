"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Interest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Interest.init(
    {
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
      HQ_grade: DataTypes.STRING,
      HQ_schoolName: DataTypes.STRING,
      HQ_completed: DataTypes.STRING,
      HQ_programmeYear: DataTypes.STRING,
      HQ_qualification: DataTypes.STRING,

      PQ_Grade: DataTypes.STRING,
      PQ_schoolName: DataTypes.STRING,
      PQ_completed: DataTypes.STRING,
      PQ_programmeYear: DataTypes.STRING,
      PQ_qualification: DataTypes.STRING,
      highSchoolName: DataTypes.STRING,
      completionYear: DataTypes.STRING,
      englishTest: DataTypes.STRING,
      sponsor: DataTypes.STRING,
      sponsorName: DataTypes.STRING,
      sponsorOccupation: DataTypes.STRING,
      budget: DataTypes.STRING,
      hasApplied: DataTypes.STRING,
      purpose: DataTypes.STRING,
      reasonOfRefusal: DataTypes.STRING,
      moreInfo: DataTypes.STRING,
      hasSubmitted: DataTypes.BOOLEAN,
      hasDeleted: DataTypes.BOOLEAN,
      stage: DataTypes.STRING,
      countryId: DataTypes.INTEGER,
      cityId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Interest",
    }
  );
  return Interest;
};
