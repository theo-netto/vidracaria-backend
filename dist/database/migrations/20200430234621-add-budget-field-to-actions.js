"use strict";module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('actions', 'budget_id', {
      type: Sequelize.INTEGER,
      references: { model: 'budgets', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumns('actions', 'budget_id');
  },
};
