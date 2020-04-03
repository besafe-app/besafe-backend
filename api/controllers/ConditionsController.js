/**
 * ConditionsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: async (req,res) => {
    const {name} = req.allParams();
    const language = req.param('language') || 'pt';
    try {
      if (name && language) {
        const conditions = await Conditions.create({name:name, language:language}).fetch();
        return res.status(201).json(conditions);
      } else {
        return res.status(400).json({message:'Missing arguments'});
      }
    } catch(e) {
      console.error(e);
      return res.status(200).send(e);
    }
  },
  get: async (req,res) => {
    const {language} = req.param('language') || 'pt';
    try {
      const conditions = await Conditions.find({language:language}).sort('name ASC');
      return res.status(200).json(conditions);
    } catch(e) {
      console.error(e);
      return res.status(200).send(e);
    }
  },
  setConditionAndUser: async (req,res) => {
    const {conditions} = req.allParams();
    try {
      conditions.forEach(async (condition) => {
        await UserConditions.create({user:req.session.user.id, condition:condition});
      });
      return res.status(204).send();
    } catch(e) {
      console.error(e);
      return res.status(200).send(e);
    }
  },
  getByUser: async(req,res) => {
    try {
      const conditions = await UserConditions.find({user:req.session.user.id}).populate('condition');
      if (conditions.length > 0) {
        return res.status(200).json(conditions);
      } else {
        return res.status(404).json({message:'Conditions not found'});
      }
    } catch(e) {
      console.error(e);
      return res.status(200).send(e);
    }
  }

};

