import Sequelize, { Model } from 'sequelize';

class Action extends Model {
  static init(sequelize) {
    super.init(
      {
        description: Sequelize.STRING,
        value: Sequelize.NUMBER,
        input: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
    return this;
  }
  static associate(models) {
    this.belongsTo(models.Budget, { foreignKey: 'budget_id', as: 'budget' });
  }
}
export default Action;
