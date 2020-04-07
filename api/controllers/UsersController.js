/**
* UsersController
*
* @description :: Server-side actions for handling incoming requests.
* @help        :: See https://sailsjs.com/docs/concepts/actions
*/

module.exports = {
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
        const user = await Users.findOne({nickname:name,phone:phone,code:0});
        if (!user) {
          const newUser = await Users.create({nickname:name,phone:phone}).fetch();
          return res.status(201).json(newUser);
        } else {
          return res.status(404).json({message:'User already registered'});
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
      const user = await Users.findOne({ id: id, code: 0 });
      if (user) {
        try {
          await SmsService.send(user.id);
          return res.status(200).json({message:'SMS sent'});
        } catch(e) {
          console.error(e);
          return res.status(e.status).json({ message:'Erro ao enviar SMS, por favor confirme que o número está correto' });
        }
      } else {
        return res.status(404).json({message:'User not found'});
      }
    } else {
      return res.status(400).json({message:'Missing arguments'});
    }
  },
  validateCode: async(req,res) => {
    const {id,code} = req.allParams();
    if (id && code) {
      try {
        const user = await Users.findOne({id:id, code: code});
        const validCode = await JwtService.verify(user.token, (error) => {
          if (error) {
            return false;
          }
          return true;
        });
        if (user && validCode) {
          const plainObjectUser = { ...user };
          delete plainObjectUser.token;
          const token = JwtService.issue(plainObjectUser);
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
};

