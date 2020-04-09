/**
 * AdminUser.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    cpf: {
      type: 'string',
      required: true,
      unique: true
    },
    email: {
      type: 'string',
      required: true,
    },
    password: {
      type: 'string',
      required: true,
    },
    phone: {
      type: 'string',
    },
    name: {
      type: 'string',
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
  },
};
