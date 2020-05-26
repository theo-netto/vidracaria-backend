import * as Yup from 'yup';
import Action from '../models/Action';
import Budget from '../models/Budget';

class ActionController {
  async show(req, res) {
    const { id } = req.params;

    const budgetExists = await Budget.findByPk(id);

    if (!budgetExists) {
      return res.status(400).json({ error: 'Budget not found' });
    }

    let actions = await Action.findAll({
      where: { budget_id: id },
      attributes: ['id', 'description', 'value', 'input', 'budget_id'],
    });

    actions.map(async (action) => {
      if (action.value < 0) {
        const valueFormatted = action.value * -1;

        // await action.update({value:valueFormatted})
        const editAction = await Action.findByPk(action.id);

        await editAction.update({ value: valueFormatted });
      }
    });

    actions = await Action.findAll({
      where: { budget_id: id },
      attributes: ['id', 'description', 'value', 'input', 'budget_id'],
    });
    return res.json(actions);
  }
  async index(req, res) {
    let actions = await Action.findAll({
      attributes: ['id', 'description', 'value', 'input', 'budget_id'],
    });

    actions.map(async (action) => {
      if (action.value < 0) {
        const valueFormatted = action.value * -1;

        // await action.update({value:valueFormatted})
        const editAction = await Action.findByPk(action.id);

        await editAction.update({ value: valueFormatted });
      }
    });

    actions = await Action.findAll({
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
      const budgetExists = await Budget.findByPk(budget_id);

      if (!budgetExists) {
        return res.status(400).json({ error: 'Budget not found' });
      }
    }

    if (value < 0) {
      value = value * -1;
      input = false;
    }

    const action = await Action.create({
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

    const action = await Action.findOne({ where: { id } });

    if (!action) {
      return res.status(400).json({ error: 'Action not found' });
    }

    const { budget_id } = req.body;

    if (budget_id) {
      const budgetExists = await Budget.findByPk(budget_id);

      if (!budgetExists) {
        return res.status(400).json({ error: 'Budget not found' });
      }
    }

    await action.update(req.body);

    const resAction = await Action.findOne({ where: { id } });

    return res.json(resAction);
  }
}

export default new ActionController();
