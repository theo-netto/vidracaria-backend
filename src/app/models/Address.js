import Sequelize, { Model } from 'sequelize';

class Address extends Model {
  static init(sequelize) {
    super.init(
      {
        street: Sequelize.STRING,
        number: Sequelize.STRING,
        neighborhood: Sequelize.STRING,
        city: Sequelize.STRING,
        uf: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}
export default Address;
