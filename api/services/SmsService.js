const SmsService = require('sails-service-sms');

const ServiceSMS = SmsService('twilio', {
  sender: process.env.TWILIO_NUMBER,
  provider: {
    accountSid: process.env.TWILIO_ACCOUNT_ID,
    authToken: process.env.TWILIO_TOKEN,
  },
});

module.exports = {
  send: async (phone, message, callback) => {
    return await ServiceSMS.send({
      recipient: [phone],
      message: `${message}`,
    })
      .then(async () => callback && callback())
      .catch((error) => {
        throw error;
      });
  },
};
