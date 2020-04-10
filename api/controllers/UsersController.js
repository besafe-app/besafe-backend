/**
* UsersController
*
* @description :: Server-side actions for handling incoming requests.
* @help        :: See https://sailsjs.com/docs/concepts/actions
*/

module.exports = {
  getAll: async(req, res) => {
    try {
      let users = await Users.find();
      if(users.length){
        for(let i = 0; i< users.length; i++){
          let userConditions = await UserConditions.find({user: users[i].id});
          for(let j = 0; j < userConditions.length; j++){
            let element = await Conditions.findOne({id: userConditions[j].condition})
            if(element){
              userConditions[j].condition = element.name;
            }            
          }
          users[i].conditions = userConditions;
        }
        return res.status(200).json(users);
      }else{
        return res.status(404).json({ message: 'No common user has been registered' });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  check: async(req,res) => {
    const {name,phone} = req.allParams();
    if (name && phone) {
      try {
        const user = await Users.findOne({nickname:name,phone:phone});
        if (user) {
          return res.status(200).json({message:'User already registred'});
        } else {
          return res.status(404).json({message:'User not found'});
        }
      } catch(e) {
        console.error(e);
        return res.status(500).send(e);
      }
    } else {
      return res.status(400).json({message:'Missing arguments'});
    }
  },
  createFirstStep: async(req,res) => {
    const {name,phone} = req.allParams();
    if (name && phone) {
      try {
        const targetUser = await Users.findOne({ nickname: name, phone: phone, code:0 });
        if (!targetUser) {
          const user = await Users.create({nickname:name,phone:phone}).fetch();
          let userPlainObject = { ...user, code: 0, token: null };
          const code = await SmsService.send(user.id);
          userPlainObject.code = code;
          const token = JwtService.issue(userPlainObject);
          userPlainObject = { ...userPlainObject, token: token };
          delete userPlainObject.createdAt;
          delete userPlainObject.updatedAt;
          await Users.updateOne({ id: user.id }).set({ token: token });
          return res.status(201).json(userPlainObject);
        } else {
          return res.status(200).json({message:'User already registered'});
        }
      } catch(e) {
        console.error(e);
        return res.status(500).send(e);
      }
    } else {
      return res.status(400).json({message:'Missing arguments'});
    }
  },
  sendSMS: async(req,res) => {
    const {id} = req.allParams();
    if (id) {
      try {
        const user = await Users.findOne({id,code:0});
        if (user) {
          const SMS = SmsService.send(user.id);
          if (!SMS) {
            return res.status(200).json({message:'User already registred'});
          } else {
            return res.status(200).json({message:'SMS sent'});
          }
        } else {
          return res.status(404).json({message:'User not found'});
        }
      } catch(e) {
        console.error(e);
        return res.status(500).send(e);
      }
    } else {
      return res.status(400).json({message:'Missing arguments'});
    }
  },
  validateCode: async(req,res) => {
    const {id,code} = req.allParams();
    if (id && code) {
      try {
        const user = await Users.findOne({id:id,code:code});
        if (user) {
          const token = JwtService.issue(user);
          await Users.update({id:id},{token:token});
          return res.status(200).json({token:token});
        } else {
          return res.status(404).json({message:'Code or user are invalid'});
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
    const {name,gender,birthDate} = req.allParams();
    if (name && gender && birthDate) {
      const user = await Users.update({id:req.session.user.id},{name:name,gender:gender,birthDate: new Date(birthDate)}).fetch();
      return res.status(200).json(user);
    } else {
      return res.status(400).json({message:'Missing arguments'});
    }
  },

  auth: async(req, res) => {
    try {
      const { phone, name } = req.allParams();
      const user = await Users.findOne({ phone: phone, nickname: name });
      if (user) {
        if (user.code !== 0 && user.token && user.activated) {
          return res.status(200).json(user);
        }
        return res.status(400).json({message:'User is not verified or activated'});
      }
      return res.status(404).json({message:'User not found'});
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
  activate: async(req, res) => {
    try{
      const { id } = req.allParams();
      if(id){
        let user = await Users.findOne({id});
        if(user){
          user = await Users.update({id}, {activated: true}).fetch();
          return res.status(200).json(user[0]);
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
        let user = await Users.findOne({id});
        if(user){
          user = await Users.update({id}, {activated: false}).fetch();
          return res.status(200).json(user[0]);
        }
        return res.status(404).json({message:'User not found'});
      }
      return res.status(400).json({message:'Missing arguments'});
    }catch (error){
      return res.status(500).json({message: error.message});
    }
  }
};
