const { Message, Sender } = require('node-gcm');
const { promisify } = require('util');

module.exports = {
  /**
   * @param {object} options
   * @param {string} options.title
   * @param {string} options.body
   * @param {string[]} options.tokens
   */
  send({ title, body, tokens }) {
    const sender = new Sender(process.env.FCM_API_KEY);
    const message = new Message({
      notification: {
        title,
        body,
        icon: 'ic_launcher',
      },
    });

    const registrationTokens = [];

    while (tokens.length !== 0) {
      registrationTokens.push(tokens.splice(0, 1000));
    }

    const send = promisify(sender.send);

    return Promise.all(
      registrationTokens.map((token) => send(message, { registrationTokens: token }, 1)),
    );
  },
};
