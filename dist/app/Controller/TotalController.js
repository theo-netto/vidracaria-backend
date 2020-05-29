"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Action = require('../models/Action'); var _Action2 = _interopRequireDefault(_Action);

class TotalController {
  async show(req, res) {
    const { id } = req.params;
    const positive = await _Action2.default.findAll({
      where: { input: true, budget_id: id },
      attributes: ['value', 'id', 'input', 'budget_id'],
    });
    const negative = await _Action2.default.findAll({
      where: { input: false, budget_id: id },
      attributes: ['value', 'id', 'input', 'budget_id'],
    });

    let somarPositive = 0;
    let somarNegative = 0;
    let input = true;

    positive.map((valor) => {
      somarPositive += valor.value;
    });

    negative.map((valor) => {
      somarNegative += valor.value;
    });

    let total = somarPositive - somarNegative;

    if (total < 0) {
      input = false;
      total = total * -1;
    }

    return res.json({ value: total, input });
  }

  async index(req, res) {
    const positive = await _Action2.default.findAll({
      where: { input: true },
      attributes: ['value', 'id', 'input', 'budget_id'],
    });
    const negative = await _Action2.default.findAll({
      where: { input: false },
      attributes: ['value', 'id', 'input', 'budget_id'],
    });

    let somarPositive = 0;
    let somarNegative = 0;
    let input = true;

    positive.map((valor) => {
      somarPositive += valor.value;
    });

    negative.map((valor) => {
      somarNegative += valor.value;
    });

    let total = somarPositive - somarNegative;

    if (total < 0) {
      input = false;
      total = total * -1;
    }

    return res.json({ value: total, input });
  }
}

exports. default = new TotalController();
