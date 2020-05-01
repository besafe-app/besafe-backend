module.exports = {
  get: async (req, res) => {
    try {
      const { id } = req.session.user;
      if (id) {
        const adminUser = await AdminUsers.findOne({ id });
        if (adminUser) {
          return res.status(200).json(adminUser);
        }
      }

      return res.status(400).json({ message: 'Missing arguments' });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  },
  create: async (req, res) => {
    const { email, password, phone, name, gender, birthdate } = req.allParams();
    try {
      if (email && password) {
        const targetUser = await AdminUsers.findOne({ email });
        if (!targetUser) {
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
          await AdminUsers.updateOne({ id: user.id }).set({ token });
          delete plainUser.password;
          plainUser.token = token;
          return res.status(201).json(plainUser);
        }
        return res.status(409).json({ message: 'User already registered' });
      }
      return res.status(400).json({ message: 'Missing arguments' });
    } catch (error) {
      console.error(error);
      const status = error.code || error.status || 500;
      return res.status(status).json(error);
    }
  },
  auth: async (req, res) => {
    try {
      const { email, password } = req.allParams();
      const user = await AdminUsers.findOne({ email });
      if (user) {
        const decryptedPass = CryptoService.decrypt(user.password);
        if (password === decryptedPass && user.activated) {
          const plainUser = { ...user };
          delete plainUser.password;
          return res.status(200).json(plainUser);
        }
        return res.status(422).json({ message: 'User or password is invalid' });
      }
      return res.status(422).json({ message: 'User or password is invalid' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
  },
  recoveryGreenCard: async (req, res) => {
    try {
      const { email, type } = req.allParams();
      if (email && type) {
        const adminUser = await AdminUsers.findOne({ email });
        if (adminUser) {
          if (type === 1) {
            const code = CodeService.generate();
            EmailService.sendCode({ email, name: adminUser.name, code });
            await AdminUsers.update({ email, id: adminUser.id }, { code });
            return res.status(200).json({ message: 'Email sent' });
          }
          const code = CodeService.generate();
          const message = `Be safe, aqui está o seu código verificador: ${code}`;

          SmsService.send(adminUser.phone, message);

          await AdminUsers.updateOne({ id: adminUser.id }).set({
            code,
          });

          return res.status(200).json({ message: 'SMS sent' });
        }
        return res.status(404).json({ message: 'Email not exists' });
      }
      return res.status(400).json({ message: 'Missing arguments' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
  },
  validateCode: async (req, res) => {
    const { email, code } = req.allParams();
    if (email && code) {
      try {
        const adminuser = await AdminUsers.findOne({
          email,
          code,
        });
        if (adminuser) {
          if (adminuser.code === code) {
            const newCode = CodeService.generate();
            const password = CryptoService.decrypt(adminuser.password);
            await AdminUsers.update({ email, code }, { code: newCode });
            EmailService.sendPass({ email, name: adminuser.name, password });
            return res.status(200).json({ success: true });
          }
          return res.status(403).json({ message: '403 Forbidden' });
        }
        return res.status(404).json({ message: 'Invalid Admin' });
      } catch (e) {
        console.error(e);
        return res.status(500).send(e);
      }
    } else {
      return res.status(400).json({ message: 'Missing arguments' });
    }
  },
  activate: async (req, res) => {
    try {
      const { id } = req.allParams();
      if (id) {
        let user = await AdminUsers.findOne({ id });
        if (user) {
          user = await AdminUsers.updateOne({ id }).set({ activated: true });
          return res.status(200).json(user);
        }
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(400).json({ message: 'Missing arguments' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
  },
  deactivate: async (req, res) => {
    try {
      const { id } = req.allParams();
      if (id) {
        let user = await AdminUsers.findOne({ id });
        if (user) {
          user = await AdminUsers.updateOne({ id }).set({ activated: false });
          return res.status(200).json(user);
        }
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(400).json({ message: 'Missing arguments' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
  },
  updateProfile: async (req, res) => {
    const { data } = req.allParams();
    const adminUser = await AdminUsers.findOne({ id: req.session.user.id });
    if (adminUser) {
      if (data) {
        try {
          if (data.id) {
            delete data.id;
          }
          if (data.password) {
            delete data.password;
          }
          if (data.token) {
            delete data.token;
          }
          const userUpdated = await AdminUsers.updateOne({
            id: req.session.user.id,
          }).set(data);
          return res.status(200).json(userUpdated);
        } catch (error) {
          return res.status(500).json({ message: error.message });
        }
      } else {
        return res.status(400).json({ message: 'Missing arguments' });
      }
    } else {
      return res.status(404).json({ message: 'Invalid admin user' });
    }
  },
};
