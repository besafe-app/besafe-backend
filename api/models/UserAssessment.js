/**
 * UserAssessment.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    assessment: {
      model: 'assessments',
      required: true,
    },
    user: {
      model: 'users',
      required: true,
    },
  },
};
