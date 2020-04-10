module.exports = {
  send: async (id) => {
    const textNumber = Math.floor(100000 + Math.random() * 900000);
    try {
      await Users.update({id:id},{code:textNumber});
      return textNumber;
    } catch(e) {
      console.error(e);
      return false;
    }
  },
  sendAdmin: async (id) => {
    const textNumber = Math.floor(100000 + Math.random() * 900000);
    try {
      await AdminUsers.update({id:id},{code:textNumber});
      return textNumber;
    } catch(e) {
      console.error(e);
      return false;
    }
  }
};
