const CriptoJs = require('crypto-js');
const passphrase = process.env.PASSPHRASE;
const frontendPassphrase = process.env.FRONT_PASSPHRASE;

module.exports = {
  encrypt: (data) => {
    return CriptoJs.AES.encrypt(data, passphrase).toString();
  },
  decrypt: (encrypted) => {
    return CriptoJs.AES.decrypt(encrypted, passphrase).toString(CriptoJs.enc.Utf8);
  },
  frontendDecrypt: (encrypted) => {
    return CriptoJs.AES.decrypt(encrypted, frontendPassphrase);
  }
};
