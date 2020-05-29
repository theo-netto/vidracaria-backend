"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _sequelize = require('sequelize');

var _Budget = require('../models/Budget'); var _Budget2 = _interopRequireDefault(_Budget);
var _Client = require('../models/Client'); var _Client2 = _interopRequireDefault(_Client);
var _Address = require('../models/Address'); var _Address2 = _interopRequireDefault(_Address);

class BudgetController {
  async show(req, res) {
    const { id } = req.params;
    const budgets = await _Budget2.default.findOne({
      where: { id },
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
  async index(req, res) {
    const { q, page = 1, limit = 5 } = req.query;
    const where = {};
    let budgets = [];

    let total = 0;

    total = await _Budget2.default.count({ where });

    budgets = await _Budget2.default.findAll({
      order: [['id', 'DESC']],
      limit,
      offset: (page - 1) * limit,
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

    if (q) {
      budgets = await _Budget2.default.findAll({
        order: [['id', 'DESC']],

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
            attributes: [
              'id',
              'street',
              'number',
              'neighborhood',
              'city',
              'uf',
            ],
          },
        ],
      });
    }
    return res.json({
      limit,
      page: Number(page),
      pages: Math.ceil(total / limit),
      total,
      items: budgets,
    });
  }
  async store(req, res) {
    const schema = Yup.object().shape({
      client_id: Yup.number().required(),
      address_id: Yup.number().required(),
      description: Yup.string().required(),
      value: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation Fails' });
    }

    const { client_id, description, value, address_id } = req.body;

    const clientExists = await _Client2.default.findByPk(client_id);

    if (!clientExists) {
      return res.status(400).json({ error: 'Cliente not Found' });
    }

    const { id, status } = await _Budget2.default.create({
      client_id,
      description,
      value,
      address_id,
      status: 'pendente',
    });

    return res.json({ id, client_id, description, value, status });
  }
  async update(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string(),
      value: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation Fails' });
    }

    const { id } = req.params;

    const budget = await _Budget2.default.findByPk(id);

    if (!budget) {
      return res.status(400).json({ error: 'Budget not exists' });
    }

    const {
      description,
      status,
      value,
      canceled_at,
      finished_at,
      client_id,
      address_id,
    } = await budget.update(req.body);

    const client = await _Client2.default.findOne({
      where: { id: client_id },
      attributes: ['id', 'name', 'email', 'telephone'],
    });

    const address = await _Address2.default.findOne({
      where: { id: address_id },
      attributes: ['id', 'street', 'number', 'neighborhood', 'city', 'uf'],
    });

    return res.json({
      id,
      description,
      status,
      value,
      canceled_at,
      finished_at,
      client,
      address,
    });
  }
  async delete(req, res) {
    const { id } = req.params;

    const budget = await _Budget2.default.findByPk(id);

    if (!budget) {
      return res.status(400).json({ error: 'Budget not exists' });
    }

    await budget.destroy();

    return res.json({ status: 'Budget Delete Sucess' });
  }
}

exports. default = new BudgetController();
