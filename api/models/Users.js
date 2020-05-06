/**
 * Users.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    name: {
      type: 'string',
    },
    phone: {
      type: 'string',
      required: true,
    },
    nickname: {
      type: 'string',
      required: true,
    },
    code: {
      type: 'number',
      defaultsTo: 0,
    },
    gender: {
      type: 'string',
      isIn: ['male', 'female', 'other'],
    },
    birthdate: {
      type: 'ref',
      columnType: 'date',
    },
    token: {
      type: 'string',
      allowNull: null,
    },
    activated: {
      type: 'boolean',
      defaultsTo: true,
    },
    deviceToken: {
      type: 'string',
      required: true,
      columnName: 'device_token',
    },
  },
};
