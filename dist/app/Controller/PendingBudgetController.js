"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Budget = require('../models/Budget'); var _Budget2 = _interopRequireDefault(_Budget);
var _Client = require('../models/Client'); var _Client2 = _interopRequireDefault(_Client);
var _Address = require('../models/Address'); var _Address2 = _interopRequireDefault(_Address);

class PendingBudgetController {
  async index(req, res) {
    const budgets = await _Budget2.default.findAll({
      where: {
        status: 'pendente',
      },
      attributes: [
        'id',
        'status',
        'description',
        'value',
        'finished_at',
        'canceled_at',
      ],
      include: [
        {
          model: _Client2.default,
          as: 'client',
          attributes: ['id', 'name', 'email', 'telephone'],
        },

        {
          model: _Address2.default,
          as: 'address',
          attributes: ['id', 'street', 'number', 'neighborhood', 'city', 'uf'],
        },
      ],
    });
    return res.json(budgets);
  }
}

exports. default = new PendingBudgetController();
