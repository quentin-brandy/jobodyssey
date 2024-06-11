'use strict';
const { Model } = require('sequelize'); 
module.exports = (sequelize , DataTypes) => {
  class Chat extends Model {
    static associate(models) {
      Chat.belongsTo(models.Company, { foreignKey: 'companyId', as: 'company' });
      Chat.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      Chat.belongsTo(models.Offre, { foreignKey: 'offreId', as: 'offre' });
    }
  }
  Chat.init({
    offreId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Offres',
        key: 'id',
      },
    },
    companyId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Companies',
        key: 'id',
      },
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
    sender: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    message: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    file1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    file2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    file3: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Chat',
  });
  return Chat;
};