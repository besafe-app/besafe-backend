/**
 * AssessmentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  list: async (req, res) => {
    try {
      const assesments = await Assessments.find({}).sort('name');
      if (assesments.length > 0) {
        return res.status(200).json(assesments);
      }
      return res.status(204).json({ message: 'No assessments found' });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e);
    }
  },
  create: async (req, res) => {
    const { name } = req.allParams();
    const language = req.param('language') || 'pt';
    try {
      if (name && language) {
        const assesmentsExists = await Assessments.findOne({ name, language });
        if (!assesmentsExists) {
          const assesments = await Assessments.create({
            name,
            language,
          }).fetch();
          return res.status(201).json(assesments);
        }
        return res.status(200).json({ message: 'Assessments already registered!' });
      }
      return res.status(400).json({ message: 'Missing arguments' });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e);
    }
  },
  update: async (req, res) => {
    const { id, name } = req.allParams();
    const language = req.param('language') || 'pt';
    try {
      if (id && name) {
        const assessments = await Assessments.find({ id });
        if (assessments) {
          const assessmentUpdated = await Assessments.update({ id }, { name, language }).fetch();
          return res.status(200).json(assessmentUpdated);
        }
        return res.status(404).json({ message: 'Assessments not found' });
      }
      return res.status(400).json({ message: 'Missing arguments' });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e);
    }
  },
  delete: async (req, res) => {
    const { id } = req.allParams();
    try {
      if (id) {
        const assessments = await Assessments.find({ id });
        if (assessments) {
          const userAssessments = await UserAssessments.find({ assessment: id });
          if (userAssessments.length) {
            await UserAssessments.destroy({ assessment: id }).fetch();
          }
          const assessmentDeleted = await Assessments.destroyOne({ id });
          return res.status(200).json(assessmentDeleted);
        }
        return res.status(404).json({ message: 'Assessments not found' });
      }
      return res.status(400).json({ message: 'Missing arguments' });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e);
    }
  },
  setUserAssessment: async (req, res) => {
    const { assessments, date, lat, long } = req.allParams();
    const value = req.param('value') || 0;
    try {
      if (assessments.length > 1 && date && lat && long) {
        const newDate = new Date(date);
        const assessmentsAssociation = assessments.map((assessment) => ({
          user: req.session.user.id,
          assessment,
          date: newDate,
          value: value || 0,
          lat,
          long,
        }));
        await UserAssessments.createEach(assessmentsAssociation);
        return res.status(201).json({ message: 'Assesments register for user successfully' });
      }
      if (assessments.length === 1 && date && lat && long) {
        const newDate = new Date(date);
        await UserAssessments.create({
          user: req.session.user.id,
          assessment: assessments,
          date: newDate,
          value: value || 0,
          lat,
          long,
        }).fetch();

        return res.status(201).json({ message: 'Assesments register for user successfully' });
      }
      return res.status(400).json({ message: 'Missing Arguments' });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e);
    }
  },
  getByUser: async (req, res) => {
    try {
      const assessments = await UserAssessments.find({
        user: req.session.user.id,
      }).populate('assessment');
      if (assessments.length > 0) {
        return res.status(200).json(assessments);
      }
      return res.status(404).json({ message: 'Assessments not found' });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e);
    }
  },
  deleteByUser: async (req, res) => {
    try {
      const { ids } = req.allParams();

      if (ids) {
        const user = req.session.user.id;
        const newIds = typeof ids === 'string' ? parseInt(ids, 10) : ids;

        if (typeof newIds === 'number') {
          await UserAssessments.destroyOne({ id: newIds, user });
          return res.status(200).json({ message: 'User assesments deleted successfully' });
        }
        if (typeof newIds === 'object' && newIds.length > 1) {
          await UserAssessments.destroy({
            id: { in: newIds },
            user,
          });
          return res.status(200).json({ message: 'User assesments deleted successfully' });
        }
      }
      return res.status(400).json({ message: 'Missing Arguments' });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e);
    }
  },
  check: async (req, res) => {
    try {
      const userAssessments = await UserAssessments.find({
        where: { user: req.session.user.id },
        sort: 'createdAt ASC',
      });
      if (userAssessments.length) {
        const date = new Date(userAssessments[0].date);
        const today = new Date();
        if (date.getDate() >= today.getDate()) {
          return res.status(200).json({ message: true });
        }
        return res.status(200).json({ message: false });
      }
      return res.status(404).json({ message: 'User has not registered any updates' });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e);
    }
  },
  map: async (req, res) => {
    try {
      const { age = 'every', gender = 'every' } = req.allParams();

      const where = {};

      if (age === 'every') {
        where.startAge = 0;
        where.endAge = 99;
      } else {
        [where.startAge, where.endAge] = age.split('-');
      }

      if (gender === 'every') {
        where.gender = '';
      } else {
        where.gender = gender;
      }

      const response = await Users.getDatastore().sendNativeQuery(`
        SELECT UA.*
        FROM USERASSESSMENT UA
        INNER JOIN USERS U ON U.ID = UA."USER"
        WHERE
          U.GENDER LIKE '%${where.gender}%' OR
          (DATE_PART('year', NOW()) - DATE_PART('year', U.BIRTHDATE)) BETWEEN ${where.startAge} AND ${where.endAge}
      `);

      if (response.length === 0) {
        return res.status(204).end();
      }

      return res.status(200).json();
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  },
};
