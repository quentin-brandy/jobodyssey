'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Company.init({
    role: {
      type: DataTypes.STRING,
      defaultValue: 'Role_Company'
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    activity: DataTypes.STRING,
    presentation: DataTypes.TEXT,
    logo: DataTypes.STRING,
    banner: DataTypes.STRING,
    Linkedin: DataTypes.STRING,
    partenaire:DataTypes.BOOLEAN,
    Instagram: DataTypes.STRING,
    X: DataTypes.STRING,
    Facebook: DataTypes.STRING,
    Github: DataTypes.STRING,
    Site: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Company',
  });
  return Company;
};