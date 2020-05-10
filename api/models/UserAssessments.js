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
    date: {
      type: 'ref',
      columnType: 'datetime',
      required: true,
      custom(dateAttribute) {
        return _.isDate(dateAttribute);
      },
    },
    value: {
      type: 'number',
      defaultsTo: 0,
      custom(value) {
        return value >= 0;
      },
    },
    lat: {
      type: 'number',
      required: true,
    },
    long: {
      type: 'number',
      required: true,
    },
  },
};
