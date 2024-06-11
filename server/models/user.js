'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.OffreUsers, {
        foreignKey: 'UserId',
        as: 'offresuser'
      });
      User.hasMany(models.Experience, {
        foreignKey: 'userId',
        as: 'experiences'
      });
    }
  }
  User.init({  
    role: {
      type: DataTypes.STRING,
      defaultValue: 'Role_User'
    }, 
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    photoprofile: DataTypes.STRING,
    presentation: DataTypes.TEXT,
    cv: DataTypes.STRING,
    diplomes: DataTypes.STRING,
    Linkedin: DataTypes.STRING,
    Instagram: DataTypes.STRING,
    X: DataTypes.STRING,
    Facebook: DataTypes.STRING,
    Github: DataTypes.STRING,
    Site: DataTypes.STRING,
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};