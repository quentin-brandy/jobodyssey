'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OffreUsers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OffreUsers.belongsTo(models.Offre, { foreignKey: 'OffreId', as: 'offre' });
      OffreUsers.belongsTo(models.User, { foreignKey: 'UserId', as: 'user' });
    }
  }
  OffreUsers.init({
    OffreId:{ 
      type: DataTypes.INTEGER,
      references: {
        model: 'Offres',
        key: 'id',
      }
    },
    UserId:{ 
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      }
    },
    statut: {
      type : DataTypes.STRING,
      defaultValue: "en attente"
    }
  }, {
    sequelize,
    modelName: 'OffreUsers',
  });
  return OffreUsers;
};