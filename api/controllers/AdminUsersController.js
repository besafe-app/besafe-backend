/**
 * AdminUsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: async (req, res) => {
    const { email, password, phone, name, gender, birthdate } = req.allParams();
    if (email && password) {
      const targetUser = await AdminUsers.findOne({ email: email });
      if (!targetUser) {
        try {
          const encriptedPass = CryptoService.encrypt(password);
          const user = await AdminUsers.create({
            email,
            password: encriptedPass,
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
      return res.status(409).json({ message: 'User already registered' });
    }
    return res.status(400).json({ message: 'Missing arguments' });
  },
  auth: async (req, res) => {
    try {
      const { email, password } = req.allParams();
      const user = await AdminUsers.findOne({ email: email });
      if (user) {
        const decryptedPass = CryptoService.decrypt(user.password);
        if (password === decryptedPass) {
          const plainUser = { ...user };
          delete plainUser.password;
          return res.status(200).json(plainUser);
        }
        return res.status(422).json({ message: 'User or password is invalid' });
      }
      return res.status(422).json({ message: 'User or password is invalid' });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};
