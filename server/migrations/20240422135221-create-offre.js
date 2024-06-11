'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Offres', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      lieu: {
        allowNull: false,
        type: Sequelize.STRING
      },
      contrat: {
        allowNull: false,
        type: Sequelize.STRING
      },
      télétravail: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      compétences: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      domaine: {
        allowNull: false,
        type: Sequelize.STRING
      },
      salaire: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      adresse: {
        allowNull: false,
        type: Sequelize.STRING
      },
      active: {
        defaultValue: true,
        type: Sequelize.BOOLEAN
      },
      companyId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Companies', // nom de la table 'company' au pluriel
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Offres');
  }
};