module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('budgets', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      client_id: {
        type: Sequelize.INTEGER,
        references: { model: 'clients', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },

      value: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      finished_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      canceled_at: {
        type: Sequelize.DATE,
        allowNull: true,
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
    return queryInterface.dropTable('budgets');
  },
};
