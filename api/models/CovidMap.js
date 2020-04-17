/**
 * CovidMap.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    status: { type: 'string' },
    score: { type: 'number' },
    date: { type: 'string' },
    state: { type: 'string' },
    city: { type: 'string' },
    placeType: { type: 'string' },
    confirmed: { type: 'number' },
    deaths: { type: 'number' },
    isLast: { type: 'boolean' },
    ibgeCode: { type: 'number' },
    confRate: { type: 'number' },
    deathRate: { type: 'number' },
    x: { type: 'string' },
    y: { type: 'string' },
    geom: { type: 'string' }
  },
};
