/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {
  /***************************************************************************
   *                                                                          *
   * Default policy for all controllers and actions, unless overridden.       *
   * (`true` allows public access)                                            *
   *                                                                          *
   ***************************************************************************/

  // '*': true,
  '/swagger': true,
  UsersController: {
    check: true,
    sendSMS: true,
    createFirstStep: true,
    validateCode: true,
    auth: true,
    getAll: 'isAdmin',
    '*': 'isAuthorized',
  },
  ConditionsController: {
    '*': 'isAuthorized'
  },
  AssessmentsController: {
    '*': 'isAuthorized'
  },
  AdminUsersController:{
    validateCode: true,
    recoveryGreenCard: true,
    '*': 'isAdmin'
  }
};
