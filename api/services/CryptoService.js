const CriptoJs = require('crypto-js');

const passphrase = process.env.PASSPHRASE;
const frontendPassphrase = process.env.FRONT_PASSPHRASE;

module.exports = {
  encrypt: (data) => CriptoJs.AES.encrypt(data, passphrase).toString(),
  decrypt: (encrypted) =>
    CriptoJs.AES.decrypt(encrypted, passphrase).toString(CriptoJs.enc.Utf8),
  frontendDecrypt: (encrypted) =>
    CriptoJs.AES.decrypt(encrypted, frontendPassphrase),
};
