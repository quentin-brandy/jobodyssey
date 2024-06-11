'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      role: {
        allowNull: false,
        type: Sequelize.STRING
      },
      nom: {
        type: Sequelize.STRING
      },
      prenom: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      photoprofile: {
        type: Sequelize.STRING
      },
      presentation: {
        type: Sequelize.TEXT
      },
      cv: {
        type: Sequelize.STRING
      },
      diplomes: {
        type: Sequelize.STRING,
        defaultValue: ["Aucun Diplomes"]
      },
      Linkedin: {
        type: Sequelize.STRING
      },
      Instagram: {
        type: Sequelize.STRING
      },
      X: {
        type: Sequelize.STRING
      },
      Facebook: {
        type: Sequelize.STRING
      },
      Github: {
        type: Sequelize.STRING
      },
      Site: {
        type: Sequelize.STRING
      },
      isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
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
    await queryInterface.dropTable('Users');
  }
};