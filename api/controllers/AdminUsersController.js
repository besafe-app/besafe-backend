/**
 * AdminUsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {
  
  get: async(req, res) => {
    //Get the user logged in the session and displays info about him
    try{
      const id = req.session.user.id;
      if(id){
        const adminUser = await AdminUsers.findOne({ id: id });
        if(adminUser){
          return res.status(200).json(adminUser);
        }
      }else{
        return res.status(400).json({ message: 'Missing arguments' })
      }
    }catch(error){
      return res.status(500).json(error);
    }
  },
  create: async (req, res) => {
    try {
      const { data } = req.allParams();
      /* const {
        cpf,
        email,
        password,
        phone,
        name,
        gender,
        birthdate,
      } = JwtService.decodeFrontValue(
        data,
        (error, decoded) => {
          if (error) {
            throw error;
          }
          return decoded;
        },
      ); */
      const {
        cpf,
        email,
        password,
        phone,
        name,
        gender,
        birthdate,
      } = data;
      if (cpf && email && password) {
        const targetUser = await AdminUsers.findOne({ cpf: cpf });
        if (!targetUser) {
          try {
            const encodedPass = JwtService.issue({ password: password });
            const user = await AdminUsers.create({
              cpf,
              email,
              password: encodedPass,
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
      const { data } = req.allParams();
      const { email, password } = data;
      /* const { email, password } = JwtService.decodeFrontValue(
        data,
        (error, decoded) => {
          if (error) {
            throw error;
          }
          return decoded;
        },
      ); */
      const user = await AdminUsers.findOne({ email: email });
      if (user) {
        const decodedUserPass = JwtService.verify(
          user.password,
          (error, decoded) => {
            if (error) {
              throw error;
            }
            return decoded.password;
          },
        );
        if (decodedUserPass === password) {
          if(user.activated){
            const plainUser = { ...user };
            delete plainUser.password;
            return res.status(200).json(plainUser);
          } else{
            return res.status(403).json({message:'403 Forbidden'});
          }
        }
        return res.status(400).json({ message: 'User or password is invalid' });
      }
      return res.status(404).json({ message: 'User or password is invalid' });
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
            return res.status(200).json({success: true});
          }else{
            SmsService.sendAdmin(adminUser.id);
            return res.status(200).json({success: true});
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
            console.log('password');
            console.log(password);
            let newCode = Math.floor(100000 + Math.random() * 900000);
            console.log(newCode);
            const encodedPass = JwtService.issue({ password: password });
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
  updateProfile: async(req,res) => {
    const { data } = req.allParams();
    const adminUser = await AdminUsers.findOne({id:req.session.user.id});
    if(adminUser){
      if(data){
        try{
          if(data.id){
            delete data.id;
          }
          if(data.password){
            delete data.password;
          }
          if(data.token){
            delete data.token;
          }
          const userUpdated = await AdminUsers.updateOne({id:req.session.user.id}).set(data);
          return res.status(200).json(userUpdated);
        }catch(error){
          return res.status(500).json({message: error.message});
        }
      }else{
        return res.status(400).json({message: 'Missing arguments'});
      }
    }else{
      return res.status(404).json({message: 'Invalid admin user'});
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
