const CriptoJs = require('crypto-js');
const passphrase = sails.config.secrets.Passphrase;
const frontendPassphrase = sails.config.secrets.FrontendPassphrase;

module.exports = {
  encrypt: (data) => {
    return CriptoJs.AES.encrypt(data, passphrase);
  },
  decrypt: (encrypted) => {
    return CriptoJs.AES.decrypt(encrypted, passphrase);
  },
  frontendDecrypt: (encrypted) => {
    return CriptoJs.AES.decrypt(encrypted, frontendPassphrase);
  }
};
