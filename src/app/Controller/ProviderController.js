import * as Yup from 'yup';
import { Op } from 'sequelize';

import Provider from '../models/Provider';

class ProviderController {
  async show(req, res) {
    const { id } = req.params;
    const providers = await Provider.findOne({
      where: { id },
      attributes: ['id', 'name', 'email', 'telephone'],
    });

    return res.json(providers);
  }
  async index(req, res) {
    const { q, page = 1, limit = 5 } = req.params;
    const where = {};

    if (q) {
      where.name = { [Op.iLike]: `%${q}%` };
    }

    const total = await Provider.count({ where });

    const providers = await Provider.findAll({
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
      items: providers,
    });
  }
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      telephone: Yup.string().min(9).required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation Fails' });
    }

    const providerExists = await Provider.findOne({
      where: { email: req.body.email },
    });

    if (providerExists) {
      return res.status(400).json({ error: 'Provider alredy exists' });
    }

    const { id, name, email, telephone } = await Provider.create(req.body);

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

    const provider = await Provider.findByPk(id);

    if (!provider) {
      return res.status(400).json({ error: 'Provider not found' });
    }

    if (email && email !== provider.email) {
      const providerExists = await Provider.findOne({ where: { email } });

      if (providerExists) {
        return res.status(400).json({ error: 'Provider alredy exists' });
      }
    }

    const { name, telephone } = await provider.update(req.body);

    return res.json({
      id,
      name,
      email,
      telephone,
    });
  }
  async delete(req, res) {
    const { id } = req.params;

    const provider = await Provider.findByPk(id);

    if (!provider) {
      return res.status(400).json({ error: 'Provider not found' });
    }

    await provider.destroy();

    return res.json({
      status: 'Deletado com Sucesso',
    });
  }
}

export default new ProviderController();
