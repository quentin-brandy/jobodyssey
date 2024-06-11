'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Companies', {
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
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      activity: {
        allowNull: false,
        type: Sequelize.STRING
      },
      presentation: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      logo: {
        allowNull: false,
        type: Sequelize.STRING
      },
      banner: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Linkedin: {
        type: Sequelize.STRING
      },
      partenaire: {
        allowNull: false,
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('Companies');
  }
};