"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Application extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Application.belongsTo(models.City, {
        foreignKey: "cityId",
        as: "City",
      });
      Application.belongsTo(models.DegreeType, {
        foreignKey: "degreeTypeId",
        as: "DegreeType",
      });
      Application.belongsTo(models.Decision, {
        foreignKey: "decisionId",
        as: "Decision",
      });
      Application.belongsTo(models.VisaApplyStatus, {
        foreignKey: "visaApplyStatusId",
        as: "VisaApplyStatus",
      });
      Application.belongsTo(models.User, {
        foreignKey: "userId",
        as: "User",
      });
    }
  }
  Application.init(
    {
      // firstname: DataTypes.STRING,
      // middlename: DataTypes.STRING,
      // lastname: DataTypes.STRING,
      // dob: DataTypes.STRING,
      // gender: DataTypes.STRING,
      // marital: DataTypes.STRING,
      // homeAddress: DataTypes.STRING,
      // postalAddress: DataTypes.STRING,
      // contactEmail: DataTypes.STRING,
      // phone: DataTypes.STRING,
      // HQ_grade: DataTypes.STRING,
      // HQ_schoolName: DataTypes.STRING,
      // HQ_completed: DataTypes.STRING,
      // HQ_programmeYear: DataTypes.STRING,
      // HQ_qualification: DataTypes.STRING,

      // PQ_Grade: DataTypes.STRING,
      // PQ_schoolName: DataTypes.STRING,
      // PQ_completed: DataTypes.STRING,
      // PQ_programmeYear: DataTypes.STRING,
      // PQ_qualification: DataTypes.STRING,
      // highSchoolName: DataTypes.STRING,
      // completionYear: DataTypes.STRING,
      // englishTest: DataTypes.STRING,
      // sponsor: DataTypes.STRING,
      // sponsorName: DataTypes.STRING,
      // sponsorOccupation: DataTypes.STRING,
      // budget: DataTypes.STRING,
      // hasApplied: DataTypes.STRING,
      // purpose: DataTypes.STRING,
      // reasonOfRefusal: DataTypes.STRING,
      // moreInfo: DataTypes.STRING,

      //credential: DataTypes.STRING,
      // countryId: DataTypes.INTEGER,

      hasSubmitted: DataTypes.BOOLEAN,
      hasDeleted: DataTypes.BOOLEAN,
      stage: DataTypes.STRING,
      decision: DataTypes.STRING,

      degreeTypeOne: DataTypes.STRING,
      degreeTypeTwo: DataTypes.STRING,
      cityId: DataTypes.INTEGER,
      courseOne: DataTypes.STRING,
      courseTwo: DataTypes.STRING,

      institutionOne: DataTypes.STRING,
      institutionTwo: DataTypes.STRING,

      userId: DataTypes.INTEGER,
      eligibilityCheck: DataTypes.BOOLEAN,
      createdAt: DataTypes.DATE,

      hasSubmitted: DataTypes.BOOLEAN,
      hasApplied: DataTypes.BOOLEAN,
      hasPaid: DataTypes.BOOLEAN,
      hasDecided: DataTypes.BOOLEAN,
      hasCAS: DataTypes.BOOLEAN,
      hasDeleted: DataTypes.BOOLEAN,
      decision: DataTypes.STRING,
      refNo: DataTypes.STRING,
      regDate: DataTypes.STRING,
      //This is for the purpose of old credentials
      credential: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Application",
    }
  );
  return Application;
};
