"use strict";module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('addresses', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      street: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      number: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      neighborhood: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      city: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      uf: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('addresses');
  },
};
