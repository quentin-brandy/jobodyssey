'use strict';
const OffreUsers = require('./offreusers');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Offre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Offre.belongsTo(models.Company, { foreignKey: 'companyId', as: 'company' });
    }
  }
  Offre.init({
    name:{
      type: DataTypes.STRING,
      allowNull: false,
    } ,
    lieu: {
      type: DataTypes.STRING,
      allowNull: false,
    } ,
    contrat: {
      type: DataTypes.STRING,
      allowNull: false,
    } ,
    télétravail: {
      type: DataTypes.STRING,
      allowNull: false,
    } ,
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    } ,
    compétences: {
      type: DataTypes.TEXT,
      allowNull: false,
    } ,
    domaine: {
      type: DataTypes.STRING,
      allowNull: false,
    } ,
    salaire: {
      type: DataTypes.INTEGER,
      allowNull: false,
    } ,
    adresse: {
      type: DataTypes.TEXT,
      allowNull: false,
    } ,
    active: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: true,
    } ,
    companyId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Companies',
        key: 'id',
      }
    }
  }, {
    sequelize,
    modelName: 'Offre',
  });
  return Offre;
};