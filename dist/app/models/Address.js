"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class Address extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        street: _sequelize2.default.STRING,
        number: _sequelize2.default.STRING,
        neighborhood: _sequelize2.default.STRING,
        city: _sequelize2.default.STRING,
        uf: _sequelize2.default.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}
exports. default = Address;
