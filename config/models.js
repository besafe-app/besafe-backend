module.exports.models = {
  attributes: {
    createdAt: { type: 'number', autoCreatedAt: true },
    updatedAt: { type: 'number', autoUpdatedAt: true },
    id: { type: 'number', autoIncrement: true },
  },
  dataEncryptionKeys: {
    default: 'NL1x+I5T1qcdKml399iMtBnKUNFB7URQ+29dP/UW9eY=',
  },
  cascadeOnDestroy: true,
};
