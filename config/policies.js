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
    '*': true,
  },
  GeoController: {
    '*': true,
  },
};
