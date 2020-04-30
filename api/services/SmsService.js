const clickatell = require('clickatell-platform');

module.exports = {
  send: (phone, message) => {
    clickatell.sendMessageRest(message, [phone], process.env.SMS_API);
  },
};
