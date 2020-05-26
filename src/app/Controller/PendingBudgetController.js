import Budget from '../models/Budget';
import Client from '../models/Client';
import Address from '../models/Address';

class PendingBudgetController {
  async index(req, res) {
    const budgets = await Budget.findAll({
      where: {
        status: 'pendente',
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
}

export default new PendingBudgetController();
