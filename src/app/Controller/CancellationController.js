import Budget from '../models/Budget';
import Client from '../models/Client';
import Address from '../models/Address';

class CancellationController {
  async index(req, res) {
    const budgets = await Budget.findAll({
      where: {
        status: 'cancelado',
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

  async update(req, res) {
    const { id } = req.params;

    const budget = await Budget.findOne({ where: { id, status: 'pendente' } });

    if (!budget) {
      return res.status(400).json({ error: 'Budget not found' });
    }

    await budget.update({
      status: 'cancelado',
      canceled_at: new Date(),
    });

    return res.json({ status: 'Canceled Sucess' });
  }
}

export default new CancellationController();
