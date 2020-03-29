/**
 * AssessmentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  list: async (req, res) => {
    try {
      const assesments = await Assesments.find({}).sort('name');
      if (assesments.length > 0) {
        return res.status(200).json(assesments);
      } else {
        return res.status(204).send();
      }
    } catch (e) {
      console.error(e);
      res.status(500).send(e);
    }
  },
  create: async (req, res) => {
    const { name } = req.allParams();
    const language = req.param('language') || 'pt';
    try {
      if (name && language) {
        const assesments = await Assessments.create({
          name: name,
          language: language,
        }).fetch();
        return res.status(201).json(assesments);
      } else {
        return res.status(400).json({ message: 'Missing arguments' });
      }
    } catch (e) {
      console.error(e);
      return res.status(200).send(e);
    }
  },
  setUserAssessment: async (req, res) => {
    const { assessments } = req.allParams();
    try {
      assessments.forEach(async (assessment) => {
        await UserAssessments.create({
          user: req.session.user.id,
          assessment: assessment,
        });
      });
      return res.status(204).send();
    } catch (e) {
      console.error(e);
      return res.status(200).send(e);
    }
  },
  getByUser: async (req, res) => {
    try {
      const assessments = await UserAssessment.find({
        user: req.session.user.id,
      }).populate('assessment');
      if (assessments.length > 0) {
        return res.status(200).json(assessments);
      } else {
        return res.status(404).json({ message: 'Assessments not found' });
      }
    } catch (e) {
      console.error(e);
      return res.status(200).send(e);
    }
  },
};
