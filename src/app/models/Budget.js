import Sequelize, { Model } from 'sequelize';

class Budget extends Model {
  static init(sequelize) {
    super.init(
      {
        description: Sequelize.STRING,
        status: Sequelize.STRING,
        value: Sequelize.NUMBER,
        finished_at: Sequelize.DATE,
        canceled_at: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Client, { foreignKey: 'client_id', as: 'client' });
    this.belongsTo(models.Address, { foreignKey: 'address_id', as: 'address' });
  }
}
export default Budget;
