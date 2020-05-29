"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _Action = require('../models/Action'); var _Action2 = _interopRequireDefault(_Action);
var _Budget = require('../models/Budget'); var _Budget2 = _interopRequireDefault(_Budget);

class ActionController {
  async show(req, res) {
    const { id } = req.params;

    const budgetExists = await _Budget2.default.findByPk(id);

    if (!budgetExists) {
      return res.status(400).json({ error: 'Budget not found' });
    }

    let actions = await _Action2.default.findAll({
      where: { budget_id: id },
      attributes: ['id', 'description', 'value', 'input', 'budget_id'],
    });

    actions.map(async (action) => {
      if (action.value < 0) {
        const valueFormatted = action.value * -1;

        // await action.update({value:valueFormatted})
        const editAction = await _Action2.default.findByPk(action.id);

        await editAction.update({ value: valueFormatted });
      }
    });

    actions = await _Action2.default.findAll({
      where: { budget_id: id },
      attributes: ['id', 'description', 'value', 'input', 'budget_id'],
    });
    return res.json(actions);
  }
  async index(req, res) {
    let actions = await _Action2.default.findAll({
      attributes: ['id', 'description', 'value', 'input', 'budget_id'],
    });

    actions.map(async (action) => {
      if (action.value < 0) {
        const valueFormatted = action.value * -1;

        // await action.update({value:valueFormatted})
        const editAction = await _Action2.default.findByPk(action.id);

        await editAction.update({ value: valueFormatted });
      }
    });

    actions = await _Action2.default.findAll({
      attributes: ['id', 'description', 'value', 'input', 'budget_id'],
      order: [['id', 'DESC']],
    });

    return res.json({
      items: actions,
    });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
      value: Yup.number().required(),
      input: Yup.boolean(),
      budget_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation Fails' });
    }

    const { budget_id, description } = req.body;
    let input = true;
    let { value } = req.body;

    if (budget_id) {
      const budgetExists = await _Budget2.default.findByPk(budget_id);

      if (!budgetExists) {
        return res.status(400).json({ error: 'Budget not found' });
      }
    }

    if (value < 0) {
      value = value * -1;
      input = false;
    }

    const action = await _Action2.default.create({
      budget_id,
      value,
      description,
      input,
    });

    return res.json(action);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string(),
      value: Yup.number(),
      input: Yup.boolean(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation Fails' });
    }

    const { id } = req.params;

    const action = await _Action2.default.findOne({ where: { id } });

    if (!action) {
      return res.status(400).json({ error: 'Action not found' });
    }

    const { budget_id } = req.body;

    if (budget_id) {
      const budgetExists = await _Budget2.default.findByPk(budget_id);

      if (!budgetExists) {
        return res.status(400).json({ error: 'Budget not found' });
      }
    }

    await action.update(req.body);

    const resAction = await _Action2.default.findOne({ where: { id } });

    return res.json(resAction);
  }
}

exports. default = new ActionController();
