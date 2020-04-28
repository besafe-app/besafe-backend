/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  getAll: async (req, res) => {
    //GET ALL USERS
    // authentication will be required in the future
    try {
      let users = await Users.find();
      if (users.length) {
        return res.status(200).json(users);
      } else {
        return res
          .status(404)
          .json({ message: 'No common user has been registered' });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  check: async (req, res) => {
    const { name, phone } = req.allParams();
    if (name && phone) {
      try {
        const user = await Users.findOne({ nickname: name, phone: phone });
        if (user) {
          return res.status(200).json({ message: 'User already registred' });
        } else {
          return res.status(404).json({ message: 'User not found' });
        }
      } catch (e) {
        console.error(e);
        return res.status(500).send(e);
      }
    } else {
      return res.status(400).json({ message: 'Missing arguments' });
    }
  },
  createFirstStep: async (req, res) => {
    const { name, phone } = req.allParams();
    if (name && phone) {
      try {
        const targetUser = await Users.findOne({
          nickname: name,
          phone: phone,
        });
        if (!targetUser) {
          const code = CodeService.generate();
          const message = `Be safe, aqui está o seu código verificador de cadastro: ${code}`;

          SmsService.send(phone, message);

          const user = await Users.create({
            nickname: name,
            phone: phone,
            code: code,
          }).fetch();
          return res.status(201).json(user);
        } else {
          return res.status(200).json({ message: 'User already registered' });
        }
      } catch (e) {
        console.error(e);
        const status = e.status || 500;
        return res.status(status).send(e);
      }
    } else {
      return res.status(400).json({ message: 'Missing arguments' });
    }
  },
  sendSMS: async (req, res) => {
    const { id } = req.allParams();
    if (id) {
      const user = await Users.findOne({ id: id, code: 0 });
      if (user) {
        try {
          const code = CodeService.generate();
          const message = `Be safe, aqui está o seu código verificador: ${code}`;
          await SmsService.send(user.phone, message, async () => {
            await Users.updateOne({ id: user.id }).set({ code: code });
          });
          return res.status(200).json({ message: 'SMS sent' });
        } catch (e) {
          console.error(e);
          return res
            .status(e.status)
            .json({
              message:
                'Error sending SMS, please confirm that your phone is correct',
            });
        }
      } else {
        return res.status(404).json({ message: 'User not found' });
      }
    } else {
      return res.status(400).json({ message: 'Missing arguments' });
    }
  },
  validateCode: async (req, res) => {
    const { id, code } = req.allParams();
    if (id && code) {
      try {
        const user = await Users.findOne({ id: id, code: code });
        if (user) {
          const plainObjectUser = { ...user };
          delete plainObjectUser.token;
          const token = JwtService.issue(plainObjectUser);
          await Users.update({ id: id }, { token: token });
          return res.status(200).json({ token: token });
        } else {
          return res.status(404).json({ message: 'Code or user are invalid' });
        }
      } catch (e) {
        console.error(e);
        return res.status(500).send(e);
      }
    } else {
      return res.status(400).json({ message: 'Missing arguments' });
    }
  },

  updateProfile: async (req, res) => {
    const { name, gender, birthDate } = req.allParams();
    if (name && gender && birthDate) {
      const user = await Users.update(
        { id: req.session.user.id },
        { name: name, gender: gender, birthDate: new Date(birthDate) },
      ).fetch();
      return res.status(200).json(user);
    } else {
      return res.status(400).json({ message: 'Missing arguments' });
    }
  },

  auth: async (req, res) => {
    try {
      const { phone, name, code } = req.allParams();
      const user = await Users.findOne({
        phone: phone,
        nickname: name,
        code: code,
      });
      if (user) {
        if (user.code !== 0 && user.token && user.activated) {
          return res.status(200).json(user);
        }
        return res
          .status(401)
          .json({ message: 'User is not verified or activated' });
      }
      return res.status(404).json({ message: 'User not found' });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  activate: async (req, res) => {
    try {
      const { id } = req.allParams();
      if (id) {
        let user = await Users.findOne({ id });
        if (user) {
          user = await Users.update({ id }, { activated: true }).fetch();
          return res.status(200).json(user[0]);
        }
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(400).json({ message: 'Missing arguments' });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  deactivate: async (req, res) => {
    try {
      const { id } = req.allParams();
      if (id) {
        let user = await Users.findOne({ id });
        if (user) {
          user = await Users.update({ id }, { activated: false }).fetch();
          return res.status(200).json(user[0]);
        }
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(400).json({ message: 'Missing arguments' });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};
