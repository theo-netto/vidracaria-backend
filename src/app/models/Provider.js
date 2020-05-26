import Sequelize, { Model } from 'sequelize';

class Provider extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        telephone: Sequelize.STRING
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Provider;
