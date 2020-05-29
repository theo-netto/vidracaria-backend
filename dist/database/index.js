"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

var _User = require('../app/models/User'); var _User2 = _interopRequireDefault(_User);
var _File = require('../app/models/File'); var _File2 = _interopRequireDefault(_File);

var _Action = require('../app/models/Action'); var _Action2 = _interopRequireDefault(_Action);
var _Provider = require('../app/models/Provider'); var _Provider2 = _interopRequireDefault(_Provider);
var _Client = require('../app/models/Client'); var _Client2 = _interopRequireDefault(_Client);
var _Budget = require('../app/models/Budget'); var _Budget2 = _interopRequireDefault(_Budget);
var _Address = require('../app/models/Address'); var _Address2 = _interopRequireDefault(_Address);

var _database = require('../config/database'); var _database2 = _interopRequireDefault(_database);

const models = [_User2.default, _File2.default, _Action2.default, _Provider2.default, _Client2.default, _Budget2.default, _Address2.default];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new (0, _sequelize2.default)(_database2.default);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

exports. default = new Database();
