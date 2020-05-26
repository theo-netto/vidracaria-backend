import * as Yup from 'yup';
import Address from '../models/Address';

class AddressController {
  async store(req, res) {
    const schema = Yup.object().shape({
      street: Yup.string().required(),
      number: Yup.number().required(),
      neighborhood: Yup.string().required(),
      city: Yup.string().required(),
      uf: Yup.string().min(2).max(2).required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation Fails' });
    }

    const { id, street, number, neighborhood, city, uf } = await Address.create(
      req.body
    );

    return res.json({ id, street, number, neighborhood, city, uf });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      street: Yup.string(),
      number: Yup.number(),
      neighborhood: Yup.string(),
      city: Yup.string(),
      uf: Yup.string().min(2).max(2),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation Fails' });
    }

    const { id } = req.params;

    const address = await Address.findOne({ where: { id } });

    if (!address) {
      return res.status(400).json({ error: 'Address not found' });
    }

    const { street, number, neighborhood, city, uf } = await address.update(
      req.body
    );

    return res.json({ id, street, number, neighborhood, city, uf });
  }
}

export default new AddressController();
