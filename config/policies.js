module.exports.policies = {
  '/swagger': true,
  UsersController: {
    check: true,
    sendSMS: true,
    createFirstStep: true,
    validateCode: true,
    auth: true,
    getAll: true,
    activate: true,
    deactivate: true,
    '*': 'isAuthorized',
  },
  ConditionsController: {
    '*': true,
  },
  AssessmentsController: {
    setUserAssessment: 'isAuthorized',
    getByUser: 'isAuthorized',
    deleteByUser: 'isAuthorized',
    check: 'isAuthorized',
    map: 'isAuthorized',
    '*': true,
  },
  GeoController: {
    '*': true,
  },
  AdminUsersController:{
    auth: true,
    validateCode: true,
    recoveryGreenCard: true,
    create: true,
    '*': 'isAdmin'
  },
};
