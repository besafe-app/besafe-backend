/**
 * AdminUsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: async (req, res) => {
    try {
      const {
        cpf,
        email,
        password,
        phone,
        name,
        gender,
        birthdate,
      } = req.allParams();
      if (cpf && email && password) {
        const targetUser = await AdminUsers.findOne({ cpf: cpf });
        if (!targetUser) {
          try {
            const user = await AdminUsers.create({
              cpf,
              email,
              password,
              phone,
              name,
              gender,
              birthdate,
            }).fetch();
            const plainUser = { ...user };
            const token = JwtService.issue(plainUser);
            await AdminUsers.updateOne({ id: user.id }).set({ token: token });
            delete plainUser.password;
            plainUser.token = token;
            return res.status(201).json(plainUser);
          } catch (error) {
            console.log(error);
            const status = error.code || error.status || 500;
            return res.status(status).json(error);
          }
        }
        return res.status(200).json({ message: 'User already registered' });
      }
      return res.status(400).json({ message: 'Missing arguments' });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  auth: async (req, res) => {
    try {
      const { cpf, password } = req.allParams();
      const user = await Users.findOne({ cpf: cpf, password: password });
      if (user) {
        const plainUser = { ...user };
        delete plainUser.password;
        return res.status(200).json(plainUser);
      }
      return res.status(404).json({ message: 'User or password is invalid' });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};
