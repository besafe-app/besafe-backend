/**
 * ConditionsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: async (req, res) => {
    const { name } = req.allParams();
    const language = req.param('language') || 'pt';
    try {
      if (name && language) {
        const conditionExist = await Conditions.findOne({
          name,
          language,
        });
        if (!conditionExist) {
          const conditions = await Conditions.create({
            name,
            language,
          }).fetch();
          return res.status(201).json(conditions);
        }
        return res
          .status(200)
          .json({ message: 'Conditions already registered' });
      }
      return res.status(400).json({ message: 'Missing arguments' });
    } catch (e) {
      console.error(e);
      return res.status(200).send(e);
    }
  },
  update: async (req, res) => {
    const { id, name, language } = req.allParams();
    try {
      if (id) {
        const condition = await Conditions.find({ id });
        if (condition) {
          const conditionUpdated = await Conditions.update(
            { id },
            { name, language },
          ).fetch();
          return res.status(200).json(conditionUpdated);
        }
        return res.status(404).json({ message: 'Condition not found' });
      }
      return res.status(400).json({ message: 'Missing arguments' });
    } catch (e) {
      console.error(e);
      return res.status(500).send(e);
    }
  },
  delete: async (req, res) => {
    const { id } = req.allParams();
    try {
      if (id) {
        const condition = await Conditions.find({ id });
        if (condition) {
          const userConditions = await UserConditions.find({ condition: id });
          if (userConditions.length) {
            await UserConditions.destroy({ condition: id }).fetch();
          }
          const conditionDeleted = await Conditions.destroyOne({ id });
          return res.status(200).json(conditionDeleted);
        }
        return res.status(404).json({ message: 'Condition not found' });
      }
      return res.status(400).json({ message: 'Missing arguments' });
    } catch (e) {
      console.error(e);
      return res.status(500).send(e);
    }
  },
  get: async (req, res) => {
    try {
      const conditions = await Conditions.find({}).sort('name ASC');
      if (conditions.length) {
        return res.status(200).json(conditions);
      }
      return res.status(204).send();
    } catch (e) {
      console.error(e);
      return res.status(500).json(e);
    }
  },
  setConditionAndUser: async (req, res) => {
    const { conditions } = req.allParams();
    try {
      const userConditionsAssociation = conditions.map((condition) => ({
        user: req.session.user.id,
        condition,
      }));
      await UserConditions.createEach(userConditionsAssociation);
      return res.status(204).send();
    } catch (e) {
      console.error(e);
      return res.status(500).json(e);
    }
  },
  getByUser: async (req, res) => {
    try {
      const conditions = await UserConditions.find({
        user: req.session.user.id,
      }).populate('condition');
      if (conditions.length > 0) {
        return res.status(200).json(conditions);
      }
      return res.status(404).json({ message: 'Conditions not found' });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e);
    }
  },
};
