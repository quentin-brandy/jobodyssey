'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Experience extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Experience.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  }
  Experience.init({
    nomJob: DataTypes.STRING,
    nomEntreprise: DataTypes.STRING,
    ville: DataTypes.STRING,
    description: DataTypes.TEXT,
    dateDebut: DataTypes.DATE,
    dateFin: DataTypes.DATE,
    contrat: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users', // 'Users' est le nom de la table tel que défini par Sequelize
        key: 'id',
      }
    }
  }, {sequelize,
    modelName: 'Experience',});
  return Experience;
};