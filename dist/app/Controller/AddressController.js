"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _Address = require('../models/Address'); var _Address2 = _interopRequireDefault(_Address);

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

    const { id, street, number, neighborhood, city, uf } = await _Address2.default.create(
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

    const address = await _Address2.default.findOne({ where: { id } });

    if (!address) {
      return res.status(400).json({ error: 'Address not found' });
    }

    const { street, number, neighborhood, city, uf } = await address.update(
      req.body
    );

    return res.json({ id, street, number, neighborhood, city, uf });
  }
}

exports. default = new AddressController();
