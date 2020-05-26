import * as Yup from 'yup';
import { Op } from 'sequelize';

import Budget from '../models/Budget';
import Client from '../models/Client';
import Address from '../models/Address';

class BudgetController {
  async show(req, res) {
    const { id } = req.params;
    const budgets = await Budget.findOne({
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
          model: Client,
          as: 'client',
          attributes: ['id', 'name', 'email', 'telephone'],
        },

        {
          model: Address,
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

    total = await Budget.count({ where });

    budgets = await Budget.findAll({
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
          model: Client,
          as: 'client',
          attributes: ['id', 'name', 'email', 'telephone'],
        },
        {
          model: Address,
          as: 'address',
          attributes: ['id', 'street', 'number', 'neighborhood', 'city', 'uf'],
        },
      ],
    });

    if (q) {
      budgets = await Budget.findAll({
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
            model: Client,
            as: 'client',
            attributes: ['id', 'name', 'email', 'telephone'],
          },
          {
            model: Address,
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

    const clientExists = await Client.findByPk(client_id);

    if (!clientExists) {
      return res.status(400).json({ error: 'Cliente not Found' });
    }

    const { id, status } = await Budget.create({
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

    const budget = await Budget.findByPk(id);

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

    const client = await Client.findOne({
      where: { id: client_id },
      attributes: ['id', 'name', 'email', 'telephone'],
    });

    const address = await Address.findOne({
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

    const budget = await Budget.findByPk(id);

    if (!budget) {
      return res.status(400).json({ error: 'Budget not exists' });
    }

    await budget.destroy();

    return res.json({ status: 'Budget Delete Sucess' });
  }
}

export default new BudgetController();
