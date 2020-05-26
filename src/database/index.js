import Sequelize from 'sequelize';

import User from '../app/models/User';
import File from '../app/models/File';

import Action from '../app/models/Action';
import Provider from '../app/models/Provider';
import Client from '../app/models/Client';
import Budget from '../app/models/Budget';
import Address from '../app/models/Address';

import databaseConfig from '../config/database';

const models = [User, File, Action, Provider, Client, Budget, Address];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
