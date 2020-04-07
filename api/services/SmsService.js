const SmsService = require('sails-service-sms');

const ServiceSMS = SmsService('twilio', {
  sender: process.env.TWILIO_NUMBER,
  provider: {
    accountSid: process.env.TWILIO_ACCOUNT_ID,
    authToken: process.env.TWILIO_TOKEN,
  },
});

module.exports = {
  send: async (id) => {
    const textNumber = Math.floor(100000 + Math.random() * 900000);
    const user = await Users.findOne({ id: id });
    await ServiceSMS.send({
      recipient: [user.phone],
      message: `Be safe, aqui está o seu código verificador: ${textNumber}`,
    })
      .then(async () => {
        const token = JwtService.issue({ code: textNumber, user: id });
        await Users.updateOne({ id: id }).set({ code: textNumber, token: token });
      })
      .catch((error) => {
        throw error;
      });
    return textNumber;
  },
};
