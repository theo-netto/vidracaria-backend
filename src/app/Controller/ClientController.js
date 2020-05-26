import * as Yup from 'yup';
import { Op } from 'sequelize';

import Client from '../models/Client';

class ClientController {
  async show(req, res) {
    const { id } = req.params;
    const client = await Client.findByPk(id);

    return res.json(client);
  }
  async index(req, res) {
    const { q, page = 1, limit = 5 } = req.query;
    const where = {};

    if (q) {
      where.name = { [Op.iLike]: `%${q}%` };
    }

    const total = await Client.count({ where });

    const clients = await Client.findAll({
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
      const clientExists = await Client.findOne({
        where: { email: req.body.email },
      });

      if (clientExists) {
        return res.status(400).json({ error: 'Client alredy exists' });
      }
    }

    const { id, name, telephone } = await Client.create(req.body);

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

    const client = await Client.findByPk(id);

    if (!client) {
      return res.status(401).json({ error: 'Client not Found' });
    }

    if (email !== client.email) {
      const clientExists = await Client.findOne({ where: { email } });
      if (clientExists) {
        return res.status(401).json({ error: 'Client Exists' });
      }
    }

    const { name, telephone } = await client.update(req.body);

    return res.json({ id, name, email, telephone });
  }
  async delete(req, res) {
    const { id } = req.params;

    const client = await Client.findByPk(id);

    if (!client) {
      return res.status(400).json({ error: 'Client not found' });
    }

    await client.destroy();

    return res.json({ status: 'Client Del sucess' });
  }
}

export default new ClientController();
