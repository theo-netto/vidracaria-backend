"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _sequelize = require('sequelize');

var _Client = require('../models/Client'); var _Client2 = _interopRequireDefault(_Client);

class ClientController {
  async show(req, res) {
    const { id } = req.params;
    const client = await _Client2.default.findByPk(id);

    return res.json(client);
  }
  async index(req, res) {
    const { q, page = 1, limit = 5 } = req.query;
    const where = {};

    if (q) {
      where.name = { [_sequelize.Op.iLike]: `%${q}%` };
    }

    const total = await _Client2.default.count({ where });

    const clients = await _Client2.default.findAll({
      where,
      order: [['id', 'DESC']],
      limit,
      offset: (page - 1) * limit,
      attributes: ['id', 'name', 'email', 'telephone'],
    });

    return res.json({
      limit,
      page: Number(page),
      pages: Math.ceil(total / limit),
      total,
      items: clients,
    });
  }
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email(),
      telephone: Yup.string().min(9).required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation Fails' });
    }

    const { email } = req.body;

    if (email) {
      const clientExists = await _Client2.default.findOne({
        where: { email: req.body.email },
      });

      if (clientExists) {
        return res.status(400).json({ error: 'Client alredy exists' });
      }
    }

    const { id, name, telephone } = await _Client2.default.create(req.body);

    return res.json({
      id,
      name,
      email,
      telephone,
    });
  }
  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      telephone: Yup.string().min(9),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation Fails' });
    }

    const { id } = req.params;
    const { email } = req.body;

    const client = await _Client2.default.findByPk(id);

    if (!client) {
      return res.status(401).json({ error: 'Client not Found' });
    }

    if (email !== client.email) {
      const clientExists = await _Client2.default.findOne({ where: { email } });
      if (clientExists) {
        return res.status(401).json({ error: 'Client Exists' });
      }
    }

    const { name, telephone } = await client.update(req.body);

    return res.json({ id, name, email, telephone });
  }
  async delete(req, res) {
    const { id } = req.params;

    const client = await _Client2.default.findByPk(id);

    if (!client) {
      return res.status(400).json({ error: 'Client not found' });
    }

    await client.destroy();

    return res.json({ status: 'Client Del sucess' });
  }
}

exports. default = new ClientController();
