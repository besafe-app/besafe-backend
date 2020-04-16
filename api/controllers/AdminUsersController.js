/**
 * AdminUsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: async (req, res) => {
    const { email, password, phone, name, gender, birthdate } = req.allParams();
    try {
      if (email && password) {
        const targetUser = await AdminUsers.findOne({ email: email });
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
          await AdminUsers.updateOne({ id: user.id }).set({ token: token });
          delete plainUser.password;
          plainUser.token = token;
          return res.status(201).json(plainUser);
        }
        return res.status(409).json({ message: 'User already registered' });
      }
      return res.status(400).json({ message: 'Missing arguments' });
    } catch (error) {
      console.log(error);
      const status = error.code || error.status || 500;
      return res.status(status).json(error);
    }
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
  recoveryGreenCard: async(req, res) => {
    try{
      const { email, type } = req.allParams();
      if(email && type){
        const adminUser = await AdminUsers.findOne({email: email});
        if(adminUser){
          if(type == 1){
            let code = Math.floor(100000 + Math.random() * 900000);
            EmailService.sendCode({email, name: adminUser.name, code});
            await AdminUsers.update({email: email, id: adminUser.id},{code: code});
            return res.status(200).json({message:'Email sent'});
          }else{
            try {
              const code = CodeService.generate();
              const message = `Be safe, aqui está o seu código verificador: ${code}`;
              await SmsService.send('+55'+adminUser.phone, message, async () => {
                await AdminUsers.updateOne({ id: adminUser.id }).set({ code: code });
              });
              return res.status(200).json({message:'SMS sent'});
            } catch(e) {
              console.error(e);
              return res.status(e.status).json({ message:'Error sending SMS, please confirm that your phone is correct' });
            }
          }
        }else{
          return res.status(404).json({ message: 'Email not exists'})  
        }
      }else{
        return res.status(400).json({ message: 'Missing arguments'})
      }
    }catch(error){
      return res.status(500).json({message: error.message})
    }
  },
  validateCode: async(req,res) => {
    const {email,code } = req.allParams();
    if (email && code) {
      try {
        const adminuser = await AdminUsers.findOne({email:email,code:code});
        if(adminuser){
          if (adminuser.code == code) {
            let newPassword = (len, arr) => { 
              var ans = ''; 
              for (var i = len; i > 0; i--) { 
                  ans +=  
                    arr[Math.floor(Math.random() * arr.length)]; 
              } 
              return ans; 
            };
            let password = newPassword(20, '1234567890abcdefghijklmn');
            let newCode = Math.floor(100000 + Math.random() * 900000);
            const encodedPass = CryptoService.encrypt(password);
            await AdminUsers.update({email: email, code: code}, {password: encodedPass, code: newCode});
            EmailService.sendPass({email, name: adminuser.name, password});
            return res.status(200).json({success: true});
          }else{
            return res.status(403).json({message:'403 Forbidden'});
          }          
        } else {
          return res.status(404).json({message:'Invalid Admin'});
        }
      } catch(e) {
        console.error(e);
        return res.status(500).send(e);
      }
    } else {
      return res.status(400).json({message:'Missing arguments'});
    }
  },
  activate: async(req, res) => {
    try{
      const { id } = req.allParams();
      if(id){
        let user = await AdminUsers.findOne({id});
        if(user){
          user = await AdminUsers.updateOne({id}).set({activated: true});
          return res.status(200).json(user);
        }
        return res.status(404).json({message:'User not found'});
      }
      return res.status(400).json({message:'Missing arguments'});
    }catch (error){
      return res.status(500).json({message: error.message});
    }
  },
  deactivate: async(req, res) => {
    try{
      const { id } = req.allParams();
      if(id){
        let user = await AdminUsers.findOne({id});
        if(user){
          user = await AdminUsers.updateOne({id}).set({activated: false});
          return res.status(200).json(user);
        }
        return res.status(404).json({message:'User not found'});
      }
      return res.status(400).json({message:'Missing arguments'});
    }catch (error){
      return res.status(500).json({message: error.message});
    }
  },
};
